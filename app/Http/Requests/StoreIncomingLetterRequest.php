<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIncomingLetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'letter_number' => 'required|string|max:255|unique:incoming_letters',
            'sender' => 'required|string|max:255',
            'subject' => 'required|string|max:500',
            'received_date' => 'required|date',
            'letter_date' => 'required|date',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,normal,high,urgent',
            'status' => 'required|in:received,processing,completed,archived',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'letter_number.required' => 'Letter number is required.',
            'letter_number.unique' => 'This letter number already exists.',
            'sender.required' => 'Sender is required.',
            'subject.required' => 'Subject is required.',
            'received_date.required' => 'Received date is required.',
            'letter_date.required' => 'Letter date is required.',
        ];
    }
}