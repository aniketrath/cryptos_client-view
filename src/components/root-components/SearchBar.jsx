import React from 'react';
import Box from './Box';
import { Search } from 'lucide-react';

export default function SearchBar({
    placeholder = 'Search',
    className = '',
    onClick = () => { }, }) {
    return (
        <Box horizontal onClick={onClick} className={`bg-zinc-800 h-12 px-4 rounded-full ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className=" bg-transparent px-4 py-2 text-zinc-400 focus:outline-none"
            />
            <button className="mr-1">
                <Search />
            </button>
        </Box>
    );
}