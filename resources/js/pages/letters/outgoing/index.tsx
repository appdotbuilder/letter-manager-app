import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OutgoingLetter {
    id: number;
    letter_number: string;
    recipient: string;
    subject: string;
    letter_date: string;
    priority: string;
    status: string;
    letter_type: {
        name: string;
        code: string;
    };
    creator: {
        name: string;
    };
    secretary_signer?: {
        name: string;
    } | null;
    chairman_signer?: {
        name: string;
    } | null;
    secretary_signed_at?: string | null;
    chairman_signed_at?: string | null;
}

interface LetterType {
    id: number;
    code: string;
    name: string;
}

interface Props {
    letters: {
        data: OutgoingLetter[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    letterTypes: LetterType[];
    filters: {
        search?: string;
        status?: string;
        letter_type?: string;
    };
    userRole: string;
    [key: string]: unknown;
}

export default function OutgoingLettersIndex({ letters, letterTypes, filters, userRole }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const status = formData.get('status') as string;
        const letter_type = formData.get('letter_type') as string;
        
        router.get('/outgoing-letters', {
            search: search || undefined,
            status: status || undefined,
            letter_type: letter_type || undefined,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        router.get('/outgoing-letters');
    };

    const getStatusBadge = (status: string) => {
        const badges = {
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

    const getStatusIcon = (status: string) => {
        const icons = {
            'draft': '📝',
            'pending_secretary': '📋',
            'pending_chairman': '👑',
            'signed': '✅',
            'rejected': '❌',
        };
        return icons[status as keyof typeof icons] || '📄';
    };

    return (
        <AppShell>
            <Head title="Outgoing Letters" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📤 Outgoing Letters</h1>
                        <p className="text-gray-600">Create and manage official correspondence</p>
                    </div>
                    <Link href="/outgoing-letters/create">
                        <Button className="bg-green-600 hover:bg-green-700">
                            📝 Create New Letter
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>🔍 Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid md:grid-cols-5 gap-4">
                                <Input
                                    name="search"
                                    placeholder="Search by number, recipient, or subject..."
                                    defaultValue={filters.search || ''}
                                />
                                <Select name="status" defaultValue={filters.status || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Status</SelectItem>
                                        <SelectItem value="draft">📝 Draft</SelectItem>
                                        <SelectItem value="pending_secretary">📋 Pending Secretary</SelectItem>
                                        <SelectItem value="pending_chairman">👑 Pending Chairman</SelectItem>
                                        <SelectItem value="signed">✅ Signed</SelectItem>
                                        <SelectItem value="rejected">❌ Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select name="letter_type" defaultValue={filters.letter_type || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Types</SelectItem>
                                        {letterTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.code} - {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-2 md:col-span-2">
                                    <Button type="submit" className="flex-1">Search</Button>
                                    <Button type="button" variant="outline" onClick={clearFilters}>Clear</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Letters List */}
                <div className="space-y-4">
                    {letters.data.length > 0 ? (
                        letters.data.map((letter) => (
                            <Card key={letter.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-green-600">
                                                    {letter.letter_number}
                                                </h3>
                                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                                                    {letter.letter_type.code}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(letter.status)}`}>
                                                    {getStatusIcon(letter.status)} {letter.status.replace('_', ' ')}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(letter.priority)}`}>
                                                    {letter.priority}
                                                </span>
                                            </div>
                                            <h4 className="font-medium text-gray-900 mb-2">{letter.subject}</h4>
                                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                                <div>
                                                    <span className="font-medium">To:</span> {letter.recipient}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Type:</span> {letter.letter_type.name}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Date:</span> {new Date(letter.letter_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Created by:</span> {letter.creator.name}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {letter.secretary_signed_at && (
                                                        <span className="text-green-600">✅ Secretary signed</span>
                                                    )}
                                                    {letter.chairman_signed_at && (
                                                        <span className="text-green-600">✅ Chairman signed</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 ml-4">
                                            <Link href={`/outgoing-letters/${letter.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            {letter.status === 'draft' && (
                                                <Link href={`/outgoing-letters/${letter.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            )}
                                            {((userRole === 'secretary' && letter.status === 'pending_secretary') ||
                                              (userRole === 'chairman' && letter.status === 'pending_chairman')) && (
                                                <Link href={`/outgoing-letters/${letter.id}`}>
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                        ✍️ Review
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="text-6xl mb-4">📤</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No outgoing letters found</h3>
                                <p className="text-gray-600 mb-4">
                                    {Object.values(filters).some(Boolean) 
                                        ? 'Try adjusting your search filters'
                                        : 'Start by creating your first letter'
                                    }
                                </p>
                                <Link href="/outgoing-letters/create">
                                    <Button>📝 Create First Letter</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {letters.meta.last_page > 1 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                    Showing {letters.data.length} of {letters.meta.total} results
                                </div>
                                <div className="flex gap-2">
                                    {letters.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm rounded ${
                                                link.active
                                                    ? 'bg-green-600 text-white'
                                                    : link.url
                                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}