import Link from "next/link";
import { Piece } from "@/types";

interface pieceCardProps {
    piece: Piece;
    lastElementObserverCallback ?: ((node: HTMLDivElement) => void) | null;
}

export default function PieceCard({ piece, lastElementObserverCallback  = null }: pieceCardProps) {
    return (
        <div
            ref={lastElementObserverCallback  || null}
            className="border-2 border-black rounded-lg mb-4"
        >
            <Link href={`/piece/${piece.slug}/`}>
                <h2 className="p-8">{piece.text}</h2>
            </Link>
        </div>
    )
}