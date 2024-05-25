import { useState, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react"

export default function useMenuToggle() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    const menuOnClickHandler = (event: ReactMouseEvent<HTMLButtonElement>) => {
        setIsMenuOpen((prev) => (!prev))
    }

    const menuOutsideOnClickHandler = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", menuOutsideOnClickHandler)

        return () => {
            document.removeEventListener("mousedown", menuOutsideOnClickHandler)
        }
    }, [])

    function closeMenu() {
        setIsMenuOpen(false)
    }

    return {
        isMenuOpen,
        menuRef,
        menuOnClickHandler,
        closeMenu,
    }
}