import "./styles.css"

const Pagination = ({totalCards, cardsPerPage, setCurrentPage, currentPage}) => {

    let pages = []

    for (let i = 1; i<= Math.ceil(totalCards/cardsPerPage) ; i++){
        pages.push(i)
    }
    
    const maxButtonsToShow = 3;
    const totalButtons = Math.min(maxButtonsToShow, pages.length);

    let startPageIndex;
    let endPageIndex;

    if (currentPage <= Math.floor(maxButtonsToShow / 2) + 1) {
        startPageIndex = 0;
        endPageIndex = totalButtons;
    } else if (currentPage >= pages.length - Math.floor(maxButtonsToShow / 2)) {
        startPageIndex = pages.length - totalButtons;
        endPageIndex = pages.length;
    } else {
        startPageIndex = currentPage - Math.floor(maxButtonsToShow / 2) - 1;
        endPageIndex = currentPage + Math.floor(maxButtonsToShow / 2);
    }

    return (
        <div className="pagination-div">
            {startPageIndex > 0 && (
                <>
                    <button onClick={() => setCurrentPage(1)}>1</button>
                    {startPageIndex > 1 && <span>...</span>}
                </>
            )}

        {pages.slice(startPageIndex, endPageIndex).map((page, index) => {
            return (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? "highlight" : ""}
                >
                {page}
                </button>
            );
        })}

        {endPageIndex < pages.length && (
            <>
                {endPageIndex < pages.length - 1 && <span>...</span>}
                <button onClick={() => setCurrentPage(pages.length)}>
                    {pages.length}
                </button>
            </>
        )}
        </div>
    );
};

export default Pagination;