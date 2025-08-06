import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    letter: {
        id: number;
        letter_number: string;
        subject: string;
        recipient: string;
        letter_date: string;
        content: string;
        letter_type: string;
        secretary_signer?: string;
        chairman_signer?: string;
        secretary_signed_at?: string;
        chairman_signed_at?: string;
        qr_code: string;
    };
    verified: boolean;
    [key: string]: unknown;
}

export default function LetterVerification({ letter }: Props) {
    return (
        <>
            <Head title="Letter Verification" />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">✅</div>
                        <h1 className="text-3xl font-bold text-green-600 mb-2">
                            Letter Verified Successfully
                        </h1>
                        <p className="text-gray-600">
                            This letter has been authenticated with digital signatures
                        </p>
                    </div>

                    {/* Letter Details */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-green-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl text-green-700">
                                        {letter.letter_number}
                                    </CardTitle>
                                    <p className="text-green-600 mt-1">{letter.letter_type}</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                        <span className="text-2xl">🔐</span>
                                    </div>
                                    <p className="text-xs text-green-600">QR Verified</p>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Letter Information</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-sm text-gray-600">Subject:</span>
                                            <p className="font-medium">{letter.subject}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Recipient:</span>
                                            <p className="font-medium">{letter.recipient}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Date:</span>
                                            <p className="font-medium">{new Date(letter.letter_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Digital Signatures</h3>
                                    <div className="space-y-3">
                                        {letter.secretary_signer && (
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 text-sm">📝</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-blue-800">Secretary</p>
                                                    <p className="text-sm text-blue-600">{letter.secretary_signer}</p>
                                                    {letter.secretary_signed_at && (
                                                        <p className="text-xs text-blue-500">
                                                            Signed: {new Date(letter.secretary_signed_at).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {letter.chairman_signer && (
                                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <span className="text-purple-600 text-sm">👑</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-purple-800">Chairman</p>
                                                    <p className="text-sm text-purple-600">{letter.chairman_signer}</p>
                                                    {letter.chairman_signed_at && (
                                                        <p className="text-xs text-purple-500">
                                                            Signed: {new Date(letter.chairman_signed_at).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Letter Content */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Letter Content</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                                        {letter.content}
                                    </pre>
                                </div>
                            </div>

                            {/* Verification Badge */}
                            <div className="border-t pt-6">
                                <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-lg">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-xl">✅</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-green-800">Authenticity Verified</p>
                                        <p className="text-sm text-green-600">
                                            This letter is genuine and has been digitally signed by authorized personnel
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center mt-8 text-gray-500">
                        <p className="text-sm">
                            Letter Management System - Digital Verification
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}