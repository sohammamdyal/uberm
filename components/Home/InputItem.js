"use client";
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = MapboxGeocoder({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN });

function InputItem({ type }) {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [placeholder, setPlaceholder] = useState('');
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);

    useEffect(() => {
        if (type === 'source') {
            setPlaceholder('Pickup Location');
        } else {
            setPlaceholder('Dropoff Location');
        }
    }, [type]);

    const handleInputChange = async (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        if (inputValue.length > 2) {
            const response = await geocodingClient.forwardGeocode({
                query: inputValue,
                autocomplete: true,
                limit: 5,
            }).send();

            if (response && response.body && response.body.features) {
                setSuggestions(response.body.features);
            } else {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const location = {
            lat: suggestion.geometry.coordinates[1],
            lng: suggestion.geometry.coordinates[0],
            name: suggestion.place_name,
            label: suggestion.text,
        };
        if (type === 'source') {
            setSource(location);
        } else {
            setDestination(location);
        }
        setValue(suggestion.place_name);
        setSuggestions([]);
    };

    return (
        <div className='bg-slate-200 p-3 px-3 rounded-lg mt-6 flex items-center gap-4'>
            <Image src={type === 'source' ? '/source.png' : '/dest.png'} width={15} height={15} alt={`${type} icon`} />
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className='w-full bg-transparent border-none outline-none'
            />
            {suggestions.length > 0 && (
                <ul className="absolute bg-white shadow-lg rounded-lg mt-2 w-full max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InputItem;
