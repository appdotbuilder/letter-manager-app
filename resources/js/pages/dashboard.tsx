import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    stats: {
        incoming_letters?: number;
        outgoing_letters?: number;
        pending_approval?: number;
        signed_letters?: number;
        pending_my_signature?: number;
        signed_by_me?: number;
    };
    recentIncoming: Array<{
        id: number;
        letter_number: string;
        sender: string;
        subject: string;
        priority: string;
        status: string;
        received_date: string;
        receiver: {
            name: string;
        };
    }>;
    recentOutgoing: Array<{
        id: number;
        letter_number: string;
        recipient: string;
        subject: string;
        priority: string;
        status: string;
        created_at: string;
        letter_type: {
            name: string;
            code: string;
        };
        creator: {
            name: string;
        };
    }>;
    userRole: string;
    [key: string]: unknown;
}

export default function Dashboard({ auth, stats, recentIncoming, recentOutgoing, userRole }: Props) {
    const getStatusBadge = (status: string) => {
        const badges = {
            'received': 'bg-blue-100 text-blue-800',
            'processing': 'bg-yellow-100 text-yellow-800',
            'completed': 'bg-green-100 text-green-800',
            'archived': 'bg-gray-100 text-gray-800',
            'draft': 'bg-gray-100 text-gray-800',
            'pending_secretary': 'bg-orange-100 text-orange-800',
            'pending_chairman': 'bg-purple-100 text-purple-800',
            'signed': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityBadge = (priority: string) => {
        const badges = {
            'low': 'bg-gray-100 text-gray-800',
            'normal': 'bg-blue-100 text-blue-800',
            'high': 'bg-orange-100 text-orange-800',
            'urgent': 'bg-red-100 text-red-800',
        };
        return badges[priority as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getRoleIcon = (role: string) => {
        const icons = {
            'superadmin': '👑',
            'chairman': '🏛️',
            'secretary': '📝',
            'staff': '👤',
        };
        return icons[role as keyof typeof icons] || '👤';
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome back, {auth.user.name}! 👋
                            </h1>
                            <p className="text-indigo-100">
                                {getRoleIcon(userRole)} {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-indigo-200">Today</div>
                            <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userRole === 'chairman' ? (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Awaiting My Signature</CardTitle>
                                    <span className="text-2xl">✍️</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {stats.pending_my_signature || 0}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Letters pending approval</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Signed by Me</CardTitle>
                                    <span className="text-2xl">✅</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">
                                        {stats.signed_by_me || 0}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Completed signatures</p>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Incoming Letters</CardTitle>
                                    <span className="text-2xl">📨</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {stats.incoming_letters || 0}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Total received</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Outgoing Letters</CardTitle>
                                    <span className="text-2xl">📤</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">
                                        {stats.outgoing_letters || 0}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Total created</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                                    <span className="text-2xl">⏳</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-600">
                                        {stats.pending_approval || 0}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Awaiting signatures</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Signed Letters</CardTitle>
                                    <span className="text-2xl">✅</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {stats.signed_letters || 0}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Completed & verified</p>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🚀 Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/incoming-letters/create">
                                <Button className="w-full justify-start" variant="outline">
                                    📨 Record Incoming Letter
                                </Button>
                            </Link>
                            <Link href="/outgoing-letters/create">
                                <Button className="w-full justify-start" variant="outline">
                                    📤 Create Outgoing Letter
                                </Button>
                            </Link>
                            {userRole === 'chairman' && (
                                <Link href="/outgoing-letters?status=pending_chairman">
                                    <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                                        ✍️ Review Pending Letters
                                    </Button>
                                </Link>
                            )}
                            {userRole === 'secretary' && (
                                <Link href="/outgoing-letters?status=pending_secretary">
                                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                        📝 Review Secretary Tasks
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>

                    {/* Role-specific info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {getRoleIcon(userRole)} Your Role & Permissions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold capitalize">{userRole}</h4>
                                    {userRole === 'superadmin' && (
                                        <p className="text-sm text-gray-600">Full system access and user management</p>
                                    )}
                                    {userRole === 'chairman' && (
                                        <p className="text-sm text-gray-600">Final approval authority for all letters</p>
                                    )}
                                    {userRole === 'secretary' && (
                                        <p className="text-sm text-gray-600">Create letters, manage templates, initial approval</p>
                                    )}
                                    {userRole === 'staff' && (
                                        <p className="text-sm text-gray-600">Record incoming mail and create drafts</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activities */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Recent Incoming Letters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📨 Recent Incoming Letters
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentIncoming.length > 0 ? (
                                <div className="space-y-3">
                                    {recentIncoming.map((letter) => (
                                        <div key={letter.id} className="border-l-4 border-blue-400 pl-4 py-2">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">{letter.letter_number}</h4>
                                                    <p className="text-sm text-gray-600 truncate">{letter.subject}</p>
                                                    <p className="text-xs text-gray-500">From: {letter.sender}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(letter.status)}`}>
                                                        {letter.status}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded text-xs ${getPriorityBadge(letter.priority)}`}>
                                                        {letter.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href="/incoming-letters">
                                        <Button variant="outline" className="w-full mt-3">
                                            View All Incoming Letters
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent incoming letters</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Outgoing Letters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📤 Recent Outgoing Letters
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentOutgoing.length > 0 ? (
                                <div className="space-y-3">
                                    {recentOutgoing.map((letter) => (
                                        <div key={letter.id} className="border-l-4 border-green-400 pl-4 py-2">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">{letter.letter_number}</h4>
                                                    <p className="text-sm text-gray-600 truncate">{letter.subject}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {letter.letter_type.code} - To: {letter.recipient}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(letter.status)}`}>
                                                        {letter.status}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded text-xs ${getPriorityBadge(letter.priority)}`}>
                                                        {letter.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href="/outgoing-letters">
                                        <Button variant="outline" className="w-full mt-3">
                                            View All Outgoing Letters
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent outgoing letters</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}