import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IncomingLetter {
    id: number;
    letter_number: string;
    sender: string;
    subject: string;
    received_date: string;
    letter_date: string;
    priority: string;
    status: string;
    receiver: {
        name: string;
    };
}

interface Props {
    letters: {
        data: IncomingLetter[];
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
    filters: {
        search?: string;
        status?: string;
        priority?: string;
    };
    [key: string]: unknown;
}

export default function IncomingLettersIndex({ letters, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const status = formData.get('status') as string;
        const priority = formData.get('priority') as string;
        
        router.get('/incoming-letters', {
            search: search || undefined,
            status: status || undefined,
            priority: priority || undefined,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        router.get('/incoming-letters');
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            'received': 'bg-blue-100 text-blue-800',
            'processing': 'bg-yellow-100 text-yellow-800',
            'completed': 'bg-green-100 text-green-800',
            'archived': 'bg-gray-100 text-gray-800',
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

    return (
        <AppShell>
            <Head title="Incoming Letters" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📨 Incoming Letters</h1>
                        <p className="text-gray-600">Manage and track all incoming correspondence</p>
                    </div>
                    <Link href="/incoming-letters/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            📨 Record New Letter
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
                            <div className="grid md:grid-cols-4 gap-4">
                                <Input
                                    name="search"
                                    placeholder="Search by number, sender, or subject..."
                                    defaultValue={filters.search || ''}
                                />
                                <Select name="status" defaultValue={filters.status || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Status</SelectItem>
                                        <SelectItem value="received">Received</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select name="priority" defaultValue={filters.priority || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Priority</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-2">
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
                                                <h3 className="text-lg font-semibold text-blue-600">
                                                    {letter.letter_number}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(letter.status)}`}>
                                                    {letter.status}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(letter.priority)}`}>
                                                    {letter.priority}
                                                </span>
                                            </div>
                                            <h4 className="font-medium text-gray-900 mb-2">{letter.subject}</h4>
                                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">From:</span> {letter.sender}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Letter Date:</span> {new Date(letter.letter_date).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Received:</span> {new Date(letter.received_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <span className="font-medium">Received by:</span> {letter.receiver.name}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 ml-4">
                                            <Link href={`/incoming-letters/${letter.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            <Link href={`/incoming-letters/${letter.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="text-6xl mb-4">📭</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No incoming letters found</h3>
                                <p className="text-gray-600 mb-4">
                                    {Object.values(filters).some(Boolean) 
                                        ? 'Try adjusting your search filters'
                                        : 'Start by recording your first incoming letter'
                                    }
                                </p>
                                <Link href="/incoming-letters/create">
                                    <Button>📨 Record First Letter</Button>
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
                                                    ? 'bg-blue-600 text-white'
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