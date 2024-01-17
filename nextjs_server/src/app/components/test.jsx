'use client'

import useSWR from 'swr';
const API_BASE_URL = 'http://localhost:8000';

export default function TestComponent() {
    const fetcher = url => fetch(API_BASE_URL + url).then(r => r.json())
    const { data, error } = useSWR('/api/base/test', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div>
            test
            {data.map((item, index) => (
                <div key={index}>
                    {item.student}
                    {/* Render your data here */}
                </div>
            ))}
        </div>
    )
}
