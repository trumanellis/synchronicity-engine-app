<script lang="ts">
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let type: 'text' | 'textarea' | 'number' = 'text';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let rows: number = 4;
	export let maxLength: number | undefined = undefined;
	export let onInput: ((value: string) => void) | undefined = undefined;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		value = target.value;
		if (onInput) onInput(value);
	}

	$: characterCount = maxLength ? `${value.length}/${maxLength}` : '';
</script>

<div class="form-field">
	<label class="form-label">
		{label}
		{#if required}<span class="required">*</span>{/if}
	</label>

	{#if type === 'textarea'}
		<textarea
			class="form-textarea"
			{placeholder}
			{value}
			{rows}
			{disabled}
			{required}
			maxlength={maxLength}
			on:input={handleInput}
		/>
	{:else}
		<input
			class="form-input"
			{type}
			{placeholder}
			{value}
			{disabled}
			{required}
			maxlength={maxLength}
			on:input={handleInput}
		/>
	{/if}

	{#if maxLength}
		<div class="character-count">{characterCount}</div>
	{/if}
</div>

<style>
	.form-field {
		margin-bottom: 1.25rem;
	}

	.form-label {
		display: block;
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
	}

	.required {
		color: rgba(255, 99, 71, 1);
		margin-left: 0.25rem;
	}

	.form-input,
	.form-textarea {
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid theme('colors.cyan.border');
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		outline: none;
		transition: all 0.2s ease;
	}

	.form-input::placeholder,
	.form-textarea::placeholder {
		color: theme('colors.sage.DEFAULT');
	}

	.form-input:focus,
	.form-textarea:focus {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.form-input:disabled,
	.form-textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.form-textarea {
		resize: vertical;
		min-height: 100px;
	}

	.character-count {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
		text-align: right;
		margin-top: 0.25rem;
	}
</style>
