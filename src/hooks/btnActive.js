export default function BtnActive(activeId, currentId) {

    const isActive = activeId === currentId

    const activeClass = isActive
        ? "bg-gold" // Stile ATTIVO
        : "bg-foreground" // Stile INATTIVO

    return { isActive, activeClass }
}