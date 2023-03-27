import SearchIcon from './assets/icon/action/search_24px.svg'

// all floating buttons (quick, inbox, and task)
import FloatingButton from './components/FloatingButton'

function App() {
  return (
    <>
      {/* container */}
      <div className="bg-[var(--background)] min-h-screen grid grid-cols-[1fr_4fr]">
        {/* sidenav */}
        <div className="border-r-[1px] border-r-[var(--primary-light)]"></div>

        {/* dashboard */}
        <div>
          <div className="flex gap-4 bg-[var(--primary-dark)] p-[1rem_1.5rem]">
            <img
              className="w-[var(--text-lg)] h-[var(--text-lg)]"
              src={SearchIcon}
              alt="Search Icon"
            />
            <input
              type="text"
              className="grow bg-transparent text-[var(--primary-light)]"
            />
          </div>

          {/* floating buttons */}
          <FloatingButton />
        </div>
      </div>
    </>
  )
}

export default App
