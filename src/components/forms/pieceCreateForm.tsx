import { ChangeEvent, FormEvent } from "react"

interface PieceCreateFormProps {
    text: string;
    isWriting: boolean;
    isPosting: boolean;
    pieceFormOnChangeHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    pieceFormOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PieceCreateForm({
    text,
    isWriting,
    isPosting,
    pieceFormOnChangeHandler,
    pieceFormOnSubmitHandler,
}: PieceCreateFormProps) {
    return (
        <form onSubmit={pieceFormOnSubmitHandler} id="create-form">
            <div>
                <label htmlFor="text" className="hidden">
                    text
                </label>
                <textarea
                    id="text"
                    name="text"
                    form="create-form"
                    required
                    maxLength={200}
                    rows={4}
                    placeholder="Write a piece!"
                    value={text}
                    onChange={pieceFormOnChangeHandler}
                    disabled={isPosting}
                    className="block w-full rounded-md border-0 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
            </div>
            <div className="flex">
                {
                    isPosting ?
                        <div className="ms-auto mt-2">Posting...</div>
                        :
                        <>
                            <button type="submit"
                                className={isWriting ? "ms-auto mt-2 bg-gray-900 text-white py-2 px-4 rounded" : "ms-auto mt-2 bg-gray-500 text-white py-2 px-4 rounded"}
                                disabled={!isWriting}
                            >
                                Post
                            </button>
                        </>
                }
            </div>
        </form>
    )
}