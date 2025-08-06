import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    const features = [
        {
            icon: '📨',
            title: 'Incoming Mail Management',
            description: 'Track and manage all incoming correspondence with detailed logging and status tracking.',
        },
        {
            icon: '📝',
            title: 'Outgoing Letter Creation',
            description: 'Create various types of official letters (SR, SK, SM, ST, SU, SI, SE) with templates.',
        },
        {
            icon: '📋',
            title: 'Letter Templates',
            description: 'Secretaries can create and manage customizable templates for consistent formatting.',
        },
        {
            icon: '🔐',
            title: 'Digital QR Signatures',
            description: 'Secure digital signatures from Chairman and Secretary with QR code verification.',
        },
        {
            icon: '👥',
            title: 'Role-Based Access',
            description: 'Four distinct user roles: Superadmin, Chairman, Secretary, and Staff with appropriate permissions.',
        },
        {
            icon: '🌐',
            title: 'Public Verification',
            description: 'Public web page for QR code verification to authenticate signed letters.',
        },
    ];

    const letterTypes = [
        { code: 'SR', name: 'Surat Rutin', description: 'Routine administrative letters' },
        { code: 'SK', name: 'Surat Keputusan', description: 'Official decision letters' },
        { code: 'SM', name: 'Surat Mandat', description: 'Authorization mandate letters' },
        { code: 'ST', name: 'Surat Tugas', description: 'Task assignment letters' },
        { code: 'SU', name: 'Surat Rekomendasi Umum', description: 'General recommendation letters' },
        { code: 'SI', name: 'Surat Instruksi', description: 'Instruction letters' },
        { code: 'SE', name: 'Surat Edaran', description: 'Circular letters' },
    ];

    if (auth.user) {
        return (
            <>
                <Head title="Letter Management System" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                📨 Letter Management System
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Welcome back, <span className="font-semibold text-indigo-600">{auth.user.name}</span>!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link href="/dashboard">
                                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                                        📊 Go to Dashboard
                                    </Button>
                                </Link>
                                <Link href="/incoming-letters">
                                    <Button variant="outline" size="lg">
                                        📨 Incoming Letters
                                    </Button>
                                </Link>
                                <Link href="/outgoing-letters">
                                    <Button variant="outline" size="lg">
                                        📤 Outgoing Letters
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl mb-2">📨</div>
                                    <h3 className="text-lg font-semibold text-gray-800">Incoming Letters</h3>
                                    <p className="text-gray-600">Manage received mail</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl mb-2">📤</div>
                                    <h3 className="text-lg font-semibold text-gray-800">Outgoing Letters</h3>
                                    <p className="text-gray-600">Create and send letters</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl mb-2">🔐</div>
                                    <h3 className="text-lg font-semibold text-gray-800">Digital Signatures</h3>
                                    <p className="text-gray-600">Secure QR verification</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl mb-2">📋</div>
                                    <h3 className="text-lg font-semibold text-gray-800">Templates</h3>
                                    <p className="text-gray-600">Standardized formats</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Role Badge */}
                        <div className="text-center mb-8">
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                                auth.user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                                auth.user.role === 'chairman' ? 'bg-red-100 text-red-800' :
                                auth.user.role === 'secretary' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                                {auth.user.role === 'superadmin' && '👑 Super Administrator'}
                                {auth.user.role === 'chairman' && '🏛️ Chairman'}
                                {auth.user.role === 'secretary' && '📝 Secretary'}
                                {auth.user.role === 'staff' && '👤 Staff'}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Letter Management System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">📨</span>
                            <span className="text-xl font-bold text-gray-800">LetterFlow</span>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/login">
                                <Button variant="outline">Sign In</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        📨 Professional Letter Management System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Streamline your organization's correspondence with our comprehensive digital letter management solution. 
                        Track incoming mail, create official letters, manage templates, and secure digital signatures with QR verification.
                    </p>
                    <div className="flex gap-4 justify-center mb-12">
                        <Link href="/register">
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg">
                                🚀 Start Managing Letters
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                📋 Sign In
                            </Button>
                        </Link>
                    </div>

                    {/* Demo QR Code */}
                    <div className="inline-block p-4 bg-white rounded-lg shadow-lg">
                        <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-4xl">📱</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Scan to verify authentic letters</p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            🌟 Powerful Features for Modern Organizations
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                                    <CardHeader>
                                        <div className="text-4xl mb-2">{feature.icon}</div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Letter Types Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            📝 Support for All Official Letter Types
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {letterTypes.map((type, index) => (
                                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-indigo-600 font-bold">{type.code}</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-800 mb-2">{type.name}</h3>
                                            <p className="text-sm text-gray-600">{type.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Role-Based Access Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            👥 Role-Based Access Control
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card className="shadow-lg border-purple-200 hover:border-purple-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">👑</div>
                                    <h3 className="text-xl font-semibold text-purple-800 mb-2">Superadmin</h3>
                                    <p className="text-gray-600">Full system control and user management</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg border-red-200 hover:border-red-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">🏛️</div>
                                    <h3 className="text-xl font-semibold text-red-800 mb-2">Chairman</h3>
                                    <p className="text-gray-600">Final approval and signature authority</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg border-blue-200 hover:border-blue-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Secretary</h3>
                                    <p className="text-gray-600">Letter creation and template management</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg border-green-200 hover:border-green-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">👤</div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-2">Staff</h3>
                                    <p className="text-gray-600">Mail tracking and basic operations</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-indigo-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Modernize Your Letter Management? 🚀
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join organizations that have digitized their correspondence workflow
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                                    Create Account
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-indigo-600">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <span className="text-2xl">📨</span>
                            <span className="text-xl font-bold">LetterFlow</span>
                        </div>
                        <p className="text-gray-400">
                            Professional Letter Management System with Digital Signatures & QR Verification
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}