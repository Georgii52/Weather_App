interface HeaderProps {
    onRefresh: () => void
}

function Header ({ onRefresh }: HeaderProps) {
    return(
        <div className="header-container">
            <h2>WEATHER</h2>
            <button onClick={onRefresh} >RELOAD</button>
        </div>
    )
}

export default Header