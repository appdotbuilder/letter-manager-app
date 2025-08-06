<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOutgoingLetterRequest extends FormRequest
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
            'letter_type_id' => 'required|exists:letter_types,id',
            'template_id' => 'nullable|exists:letter_templates,id',
            'recipient' => 'required|string|max:255',
            'subject' => 'required|string|max:500',
            'content' => 'required|string',
            'template_data' => 'nullable|array',
            'letter_date' => 'required|date',
            'priority' => 'required|in:low,normal,high,urgent',
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
            'letter_type_id.required' => 'Letter type is required.',
            'letter_type_id.exists' => 'Invalid letter type selected.',
            'recipient.required' => 'Recipient is required.',
            'subject.required' => 'Subject is required.',
            'content.required' => 'Letter content is required.',
            'letter_date.required' => 'Letter date is required.',
        ];
    }
}