import { useState } from "react";

const Books = (props) => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBooks, setSortBooks] = useState(0);

    const searchBook = async () => {
        if (search.trim()) {
            const apiKey = 'AIzaSyD3_CkGmK5_Dn6X-0Z5ItWpcKJoq4_LtKc';
            const apiURL = `https://www.googleapis.com/books/v1/volumes?q=%22${search}%22&key=${apiKey}`

            try {
                const res = await fetch(apiURL);
                const data = await res.json();

                let sortedBooks = data.items || [];

                if (sortBooks === "Newest") {
                    sortedBooks = sortedBooks.sort((a, b) => new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate))
                } else if
                    (sortBooks === "Oldest") {
                    sortedBooks = sortedBooks.sort((a, b) => new Date(a.volumeInfo.publishedDate) - new Date(b.volumeInfo.publishedDate))
                }

                setBooks(sortedBooks);

            } catch (e) {
                console.log(e)
                console.log("Error")
            }
        }
    };

    const handleSearch = () =>{
        searchBook();
    }

    const handleSort = (e) => {
        setSortBooks(e.target.value);
    }

    return (
        <>
            <h1>Book Cards</h1>
            <div id="searchDiv">
                <input onChange={(e) => setSearch(e.target.value)} placeholder="Type a book..." />
                <button id="searchButton" onClick={handleSearch}>Search</button>
                <select id="select" onChange={handleSort} onClick={handleSearch} value={sortBooks}>
                    <option value="" disabled>Sort</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
            <div className="container">
                {books.map(item => {
                    return (
                        <div className="bookCard" key={item.id}>
                            {item.volumeInfo.imageLinks?.thumbnail?(
                                <img src={item.volumeInfo.imageLinks?.thumbnail} alt="Image is not found" />
                            ):(
                                    <img src="./image1.jpg" alt="Internal error" />
                            )}
                            <h5>{item.volumeInfo.title}</h5>
                            <h4>Published: {item.volumeInfo.publishedDate.slice(0, 4)}</h4>
                            <h4>Authors: {item.volumeInfo.authors}</h4>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Books;


