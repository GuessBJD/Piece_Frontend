"use client"
import usePieces from "@/hooks/piecesHooks/usePieces"
import usePieceCreate from "@/hooks/piecesHooks/usePieceCreate"
import PieceCard from "@/components/cards/pieceCard"
import PieceCreateForm from "@/components/forms/pieceCreateForm"
import useSession from "@/hooks/authHooks/useSession"

export default function Page() {
  const { isAuthenticated } = useSession()

  const {
    pieces,
    isLoading,
    isFetching,
    isSuccess,
    lastElementObserverCallback,
  } = usePieces()

  const {
    text,
    isPosting,
    isWriting,
    pieceFormOnChangeHandler,
    pieceFormOnSubmitHandler
  } = usePieceCreate()

  return (
    <main className="container mx-auto max-h-full flex flex-1 flex-row justify-center px-6 py-12 lg:px-8">
      <div className="basis-1/2 flex flex-col">
        <div>
          {
            isAuthenticated ?
              <PieceCreateForm
                text={text}
                isPosting={isPosting}
                isWriting={isWriting}
                pieceFormOnChangeHandler={pieceFormOnChangeHandler}
                pieceFormOnSubmitHandler={pieceFormOnSubmitHandler}
              />
              :
              <></>
          }
        </div>
        <div className="mt-3">
          {
            isSuccess ?
              pieces?.map((piece, index) => (
                index === pieces.length - 1 ?
                  <PieceCard key={piece.slug} piece={piece} lastElementObserverCallback={lastElementObserverCallback} /> :
                  <PieceCard key={piece.slug} piece={piece} />
              ))
              :
              <></>
          }
          {(isLoading || isFetching) ? <div>Loading...</div> : <></>}
        </div>
      </div>
    </main>
  );
}
