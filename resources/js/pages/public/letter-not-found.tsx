import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
    qrCode: string;
    [key: string]: unknown;
}

export default function LetterNotFound({ qrCode }: Props) {
    return (
        <>
            <Head title="Letter Not Found" />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <Card className="shadow-lg">
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-6">❌</div>
                            <h1 className="text-3xl font-bold text-red-600 mb-4">
                                Letter Not Found
                            </h1>
                            <p className="text-gray-600 mb-6">
                                The QR code you scanned does not match any verified letter in our system.
                                This could mean:
                            </p>
                            <div className="text-left mb-8 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    <p className="text-gray-700">The letter has not been digitally signed yet</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    <p className="text-gray-700">The QR code is invalid or corrupted</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    <p className="text-gray-700">The letter may be a forgery</p>
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg mb-6">
                                <p className="text-sm text-red-700">
                                    <strong>QR Code:</strong> {qrCode}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    If you believe this is an error, please contact the issuing organization.
                                </p>
                                <Link href="/">
                                    <Button>
                                        🏠 Return to Home
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}