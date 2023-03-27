export default function FloatingModal({ Component }) {
  return (
    <>
      <div className="absolute bg-white bottom-[110%] right-0 w-[734px] max-w-[calc(100vw-2rem)] h-[737px] max-h-[calc(100vh-2rem-1rem-68px)] text-[var(--primary-dark)]">
        <Component />
      </div>
    </>
  )
}
