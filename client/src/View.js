import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(null);
    const { id } = useParams();

    // Fetch the blog
    useEffect(() => {
        fetch(`/view/${id}`)
        .then(res => { return res.json()})
        .then(data => {
            setLoading(false)
            setData(data)
        })
    }, [])

    // Help format date
    const formatDate = (date) => {
        const mydate = new Date(date);
        
        const day = mydate.getDate(); //Date of the month: 2 in our example
        const month = mydate.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        const year = mydate.getFullYear();

        return(day + '/' + month + '/' + year);
    }

    return(
        <div>
            { loading && <div>Loading content...</div> }
            { data && (
                <div>
                    <h2 className="mt-3">{data.title}</h2>
                    <p className="m-0">Author: {data.author}</p>
                    <p className="m-0">Posted on: {formatDate(data.datePosted)}</p>
                    <p className="mt-3">{data.content}</p>
                </div>
            )}
        </div>
    )
}

export default View;