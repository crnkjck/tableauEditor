module Tableau exposing (..)
import Formula exposing (Formula, Signed (T, F))
import Result exposing (Result (Ok, Err))
import Parser

type alias Node =
  { num : Int
  , text : String
  , ref : Int
  }
defNode = { num = 1, text = "", ref = 0 }

type alias Closed = (Int, Int)
defClosed = (0, 0)

type Tableau
  = Leaf Node (Maybe Closed)
  | Alpha Node Tableau
  | Beta Node Tableau Tableau

node : Tableau -> Node
node t =
  case t of
    Leaf n _ -> n
    Alpha n _ -> n
    Beta n _ _ -> n

formula : Tableau ->  Result Parser.Error (Signed Formula)
formula t =
  (node t).text
  |> Formula.parseSigned

mapNode : (Node -> Node) -> Tableau -> Tableau
mapNode f t =
  case t of
    Leaf n mc -> Leaf (f n) mc
    Alpha n ct -> Alpha (f n) (mapNode f ct)
    Beta n lt rt -> Beta (f n) (mapNode f lt) (mapNode f rt)

--
-- convert to table
--
type alias CellWidth = Int
type alias Cell = (CellWidth, Maybe Zipper) -- the 'Node' at that point
type alias Row = List Cell
type alias Table = List Row
asTable : Tableau -> Table
asTable t =
  let
    z = zipper t
    (c, tbl) = asHeadedTable z
  in
     [[c]] ++ tbl

asHeadedTable : Zipper -> (Cell, Table)
asHeadedTable (t, bs) =
  case t of
    Leaf n _ -> ( (1, Just (t,bs)), [] )
    Alpha n st -> let
                    sz = (t, bs) |> down
                    (top, table) = asHeadedTable sz
                    (topWidth, topElem) = top
                 in
                    (  ( topWidth, Just (t, bs)), [[top]] ++ table)
    Beta n lt rt ->
      let
        lz = (t, bs) |> left
        rz = (t, bs) |> right
        (ltop, ltable) = asHeadedTable lz
        (ltopWidth, ltopE) = ltop
        (rtop, rtable) = asHeadedTable rz
        (rtopWidth, rtopE) = rtop
      in
         ( (ltopWidth + rtopWidth, Just (t, bs))
         , [[ltop, rtop]]  ++ (merge ltable rtable)
         )


-- grr, no asymetric map2 ;(
merge : (List (List a)) -> (List (List a)) -> List (List a)
merge ll rl =
  case (ll,rl) of
    (lh::lt, rh::rt) -> (lh++rh) :: merge lt rt
    ([], rh::rt) -> rh :: merge [] rt
    (lh::lt, []) -> lh :: merge lt []
    ([], []) -> []


--
-- Zipper
--

type Crumb
  = AlphaCrumb Node
  | BetaLeftCrumb Node Tableau
  | BetaRightCrumb Node Tableau

type alias Breadcrumbs = List Crumb
type alias Zipper = (Tableau, Breadcrumbs)

zipper : Tableau -> Zipper
zipper t = (t, [])

down : Zipper -> Zipper
down (t, bs) =
  case t of
    Alpha n st -> (st, (AlphaCrumb n) :: bs)
    _ -> (t, bs)

left : Zipper -> Zipper
left (t, bs) =
  case t of
    Beta n lt rt -> (lt, (BetaLeftCrumb n rt) :: bs)
    _ -> (t, bs)

right : Zipper -> Zipper
right (t, bs) =
  case t of
    Beta n lt rt -> (rt, (BetaRightCrumb n lt) :: bs)
    _ -> (t, bs)

up : Zipper -> Zipper
up (t, bs) =
  case bs of
    (AlphaCrumb n) :: bss  -> (Alpha n t, bss)
    (BetaLeftCrumb n rt) :: bss -> (Beta n t rt, bss)
    (BetaRightCrumb n lt) :: bss -> (Beta n lt t, bss)
    [] -> (t, bs)

above : Int -> Zipper -> Zipper
above n z =
  case n of
    0 -> z
    n -> above (n - 1) (up z)

top : Zipper -> Zipper
top (t, bs) =
  case bs of
    [] -> (t, bs)
    _ -> top (up (t, bs))

modify : (Tableau -> Tableau) -> Zipper -> Zipper
modify f (t, bs) =
  (f t, bs)

modifyNode : (Node -> Node) -> Zipper -> Zipper
modifyNode f =
  modify (\t ->
    case t of
      Leaf n mc -> Leaf (f n) mc
      Alpha n st -> Alpha (f n) st
      Beta n lt rt -> Beta (f n) lt rt
  )

zTableau : Zipper -> Tableau
zTableau (t, bs) = t

zNode : Zipper -> Node
zNode = zTableau >> node

zFormula : Zipper -> Result Parser.Error (Signed Formula)
zFormula = zTableau >> formula


--
-- Actions
--

setFormula : String -> Zipper -> Zipper
setFormula text =
  modifyNode (\n -> { n | text = text })

getReffed : Int -> Zipper -> Maybe Int
getReffed ref (t, bs) =
  if (node t).num == ref
    then Just 0
    else case bs of
      a::bbs ->  Maybe.map ((+) 1) ((t, bs) |> up |> getReffed ref)
      [] -> Nothing

setRef : Int -> Zipper -> Zipper
setRef ref z =
  z |> modifyRef (z |> getReffed ref |> Maybe.withDefault 0)

modifyRef : Int -> Zipper -> Zipper
modifyRef ref =
  modifyNode (\n -> { n | ref = ref })

makeClosed : Zipper -> Zipper
makeClosed =
  modify (\t ->
    case t of
      Leaf n Nothing -> Leaf n (Just defClosed)
      _ -> t
  )

makeOpen : Zipper -> Zipper
makeOpen =
  modify (\t ->
    case t of
      Leaf n (Just p) -> Leaf n Nothing
      _ -> t
  )

setPair1 : Int -> (a,a) -> a -> (a,a)
setPair1 which p n =
  let
    (a,b) = p
  in
    case which of
      0 -> (n,b)
      _ -> (a,n)

setClosed which ref z =
  z |> modify (\t ->
    case t of
      Leaf n (Just p) ->
        Leaf n (Just (setPair1 which p (z |> getReffed ref |> Maybe.withDefault 0)))
      _ -> t
  )


extendAlpha : Zipper -> Zipper
extendAlpha =
  modify (\t ->
    case t of
      Leaf n mc ->
        Alpha n
          (Leaf defNode mc)
      _ -> t
  )

extendBeta : Zipper -> Zipper
extendBeta =
  modify (\t ->
    case t of
      Leaf n mc ->
        Beta n
          (Leaf defNode mc)
          (Leaf defNode mc)
      _ -> t
  )

delete : Zipper -> Zipper
delete =
  modify (\t -> Leaf defNode Nothing)


renumber : Tableau -> Tableau
renumber t =
  renumber2 t 0 |> Tuple.first
renumber2 : Tableau -> Int -> (Tableau, Int)
renumber2 t num =
  case t of
    Leaf n mc -> (Leaf { n | num = num + 1 } mc, num + 1)
    Alpha n st ->
      let
        (nst, num1) = renumber2 st ( num + 1)
      in
        (Alpha { n | num = num + 1 } nst, num1)
    Beta n lt rt ->
      let
        (nlt, num1) = renumber2 lt ( num + 1)
        (nrt, num2) = renumber2 rt num1
      in
        (Beta {n | num = num + 1 } nlt nrt, num2)


prettify : Tableau -> Tableau
prettify =
  mapNode (\n ->
    { n | text = case Formula.parseSigned n.text of
      Ok f -> Formula.strSigned f
      Err e -> n.text
    }
  )

--
-- debug print funcs
--

indentedNode ind n =
  let
    parsedFrm = if n.text == "" then "" else case (Formula.parseSigned n.text) of
      Ok f -> Formula.strSigned f
      Err e -> toString e
  in
    (String.repeat ind " ") ++ "(" ++ toString n.num ++ ")"
    ++ parsedFrm ++ " [" ++ (toString n.ref) ++ "]"

indentedClosed mc =
  case mc of
    Nothing -> ""
    Just (a,b) -> "*(" ++ toString a ++ "," ++ toString b ++ ")"

indented ind t =
  case t of
    Leaf n mc -> indentedNode ind n ++ " " ++ indentedClosed mc ++ "\n"
    Alpha n ct ->
      (indentedNode ind n) ++ "\n" ++ (indented (ind + 2) ct)
    Beta n lt rt ->
      (indentedNode ind n) ++ "\n" ++ (indented (ind + 2) lt) ++ (indented (ind + 2) rt)

width : Tableau -> Int
width t =
  case t of
    Leaf _ _ -> 1
    Alpha _ t -> width t
    Beta _ lt rt -> (width lt) + (width rt)


--
-- debug funcs
--

depth : Tableau -> Int
depth t = case t of
  Leaf _ _ -> 1
  Alpha _ t -> 1 + depth t
  Beta _ lt rt -> 1 + depth lt + depth rt

fLeaf text = Leaf { defNode | text = text } Nothing
fAlpha text ct =
  let
    nt = mapNode (\n -> {n | num = n.num + 1}) ct
  in
    Alpha { defNode | text = text } nt
fBeta text lt rt =
  let
    nlt = mapNode (\n -> {n | num = n.num + 1}) lt
    nrt = mapNode (\n -> {n | num = n.num + (maxNum nlt)}) rt
  in
    Beta { defNode | text = text } nlt nrt

maxNum : Tableau -> Int
maxNum t =
  case t of
    Leaf n _ -> n.num
    Alpha n ct -> max n.num (maxNum ct)
    Beta n lt rt -> max n.num (max (maxNum lt) (maxNum rt))


tl =
  fAlpha "T(a&b)"
   ( fAlpha "Ta"
       ( fAlpha "Tb"
          (fLeaf "Tc")
       )
   )

tt =
  fBeta "T((a&b)|c)"
    (fAlpha "F (a&b)"
      (fLeaf "Ta")
    )
    (fLeaf "Fc")


