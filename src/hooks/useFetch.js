import { useEffect, useState } from "react";

/*
    We can create a custom Hook by creating a standard function that starts with "use"
    it's a use in React projects where functions that start with "use" are treated as Hooks

    And React projects typically look for fuctions that start the use and enforce certain rules
    on these functions and treat them as Hooks
*/
export function useFetch(initialValue, fetchFn) {
    // Data State
    const [fetchedData, setFetchedData] = useState(initialValue);

    // Loading State
    const [isFetching, setIsFetching] = useState();

    // Error State
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || "Failed to fetch data." });
            }
            setIsFetching(false);
        }
        fetchData();
    }, [fetchFn])

    return { fetchedData, isFetching, error }
}