import { ChangeEvent, FormEvent, MouseEvent } from "react";

interface PieceEditFormProps {
    editText: string;
    isEdited: boolean;
    isUpdating: boolean;
    editFormOnChangeHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    editFormOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
    closeEditorOnClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function PieceEditForm({
    editText,
    isEdited,
    isUpdating,
    editFormOnChangeHandler,
    editFormOnSubmitHandler,
    closeEditorOnClickHandler
}: PieceEditFormProps) {
    return (
        <form id="edit-form" onSubmit={editFormOnSubmitHandler} className="flex flex-col mt-3">
            <div className="flex">
                <label htmlFor="text" className="hidden">
                    text
                </label>
                <textarea
                    id="text"
                    name="text"
                    form="edit-form"
                    required
                    maxLength={200}
                    rows={5}
                    value={editText}
                    onChange={editFormOnChangeHandler}
                    disabled={isUpdating}
                    className="block w-full rounded-md border-0 py-1.5 text-3xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
            </div>
            <div className="flex">
                {
                    isUpdating ?
                        <div className="ms-auto mt-2">Loading...</div>
                        :
                        <>
                            <button type="submit"
                                className={isEdited ? "ms-auto mt-2 bg-gray-900 text-white py-2 px-4 rounded" : "ms-auto mt-2 bg-gray-500 text-white py-2 px-4 rounded"}
                                disabled={!isEdited}
                            >
                                Save
                            </button>
                            <button type="button" onClick={closeEditorOnClickHandler} className="mt-2 ms-1 bg-gray-900 text-white py-2 px-4 rounded">Cancel</button>
                        </>
                }
            </div>
        </form>
    )
}