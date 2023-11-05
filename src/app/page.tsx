"use client";

import { useZxing } from "react-zxing";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Component() {

    const [upc, setUpc] = useState("");
    const router = useRouter();

    const { ref } = useZxing({
        onDecodeResult(result) {
            router.push(`/results/${result.getText()}`);
        },
        timeBetweenDecodingAttempts: 150
    });

    return (
        <div className="w-full min-h-screen bg-zinc-900">
            <div className="static flex justify-left align-middle m-0 p-0 gap-x-2 bg-zinc-800">
              <Image className="m-2" src="/right-bite-logo.png" alt="RightBite Logo" width={75} height={75} priority/>
              <h1 className="my-6 text-4xl text-white font-bold">RightBite</h1>
            </div>

            <div className="flex flex-col justify-center items-center">
                <video ref={ref} />
            </div>

            <p className="flex justify-center text-lg text-zinc-400 mb-4">
                Scan the barcode of a food item or input the barcode number to get a safety rating and information about its
                ingredients.
            </p>

            <div className="flex flex-col items-center justify-between gap-3 mb-6"> 
                <input
                    aria-label="Enter barcode number"
                    className="border border-zinc-700 px-2 py-1 rounded w-3/4 focus:outline-none focus:ring-2 focus:ring-primary-600 text-white bg-zinc-900"
                    placeholder="Enter barcode number"
                    type="text"
                    value={upc}
                    onChange={(e) => setUpc(e.target.value)}
                />
                <Link className="bg-white text-black px-3 py-2 rounded" href={`/results/${upc}`}>Scan</Link>
            </div>
        </div>
    )
}