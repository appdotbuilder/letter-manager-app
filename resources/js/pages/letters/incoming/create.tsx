import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';



export default function CreateIncomingLetter() {
    const { data, setData, post, processing, errors } = useForm({
        letter_number: '',
        sender: '',
        subject: '',
        received_date: new Date().toISOString().split('T')[0],
        letter_date: new Date().toISOString().split('T')[0],
        description: '',
        priority: 'normal',
        status: 'received',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/incoming-letters');
    };

    return (
        <AppShell>
            <Head title="Record Incoming Letter" />
            
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">📨 Record Incoming Letter</h1>
                    <p className="text-gray-600">Add a new incoming letter to the system</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Letter Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="letter_number">Letter Number *</Label>
                                    <Input
                                        id="letter_number"
                                        type="text"
                                        value={data.letter_number}
                                        onChange={(e) => setData('letter_number', e.target.value)}
                                        placeholder="e.g. IN-001/2024"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.letter_number} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="sender">Sender *</Label>
                                    <Input
                                        id="sender"
                                        type="text"
                                        value={data.sender}
                                        onChange={(e) => setData('sender', e.target.value)}
                                        placeholder="e.g. Ministry of Education"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.sender} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="subject">Subject *</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Brief description of letter content"
                                    className="mt-1"
                                />
                                <InputError message={errors.subject} className="mt-2" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="letter_date">Letter Date *</Label>
                                    <Input
                                        id="letter_date"
                                        type="date"
                                        value={data.letter_date}
                                        onChange={(e) => setData('letter_date', e.target.value)}
                                        className="mt-1"
                                    />
                                    <InputError message={errors.letter_date} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="received_date">Received Date *</Label>
                                    <Input
                                        id="received_date"
                                        type="date"
                                        value={data.received_date}
                                        onChange={(e) => setData('received_date', e.target.value)}
                                        className="mt-1"
                                    />
                                    <InputError message={errors.received_date} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="priority">Priority *</Label>
                                    <Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">🟢 Low</SelectItem>
                                            <SelectItem value="normal">🔵 Normal</SelectItem>
                                            <SelectItem value="high">🟠 High</SelectItem>
                                            <SelectItem value="urgent">🔴 Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="status">Status *</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="received">📨 Received</SelectItem>
                                            <SelectItem value="processing">⚙️ Processing</SelectItem>
                                            <SelectItem value="completed">✅ Completed</SelectItem>
                                            <SelectItem value="archived">📁 Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Additional notes or description about the letter (optional)"
                                    className="mt-1"
                                    rows={4}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Recording...' : '📨 Record Letter'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}