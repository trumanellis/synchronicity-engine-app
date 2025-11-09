<script lang="ts">
	export let uploadedFiles: string[] = [];
	export let onUpload: ((files: string[]) => void) | undefined = undefined;

	let isDragging = false;
	let fileInput: HTMLInputElement;

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			// Simulate file upload - in real app would upload to IPFS
			const newFiles = Array.from(target.files).map((file) => {
				return `ipfs://Qm...${file.name.slice(0, 8)}`;
			});
			uploadedFiles = [...uploadedFiles, ...newFiles];
			if (onUpload) onUpload(uploadedFiles);
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
			// Simulate file upload
			const newFiles = Array.from(e.dataTransfer.files).map((file) => {
				return `ipfs://Qm...${file.name.slice(0, 8)}`;
			});
			uploadedFiles = [...uploadedFiles, ...newFiles];
			if (onUpload) onUpload(uploadedFiles);
		}
	}

	function removeFile(index: number) {
		uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
		if (onUpload) onUpload(uploadedFiles);
	}

	function triggerFileInput() {
		fileInput.click();
	}
</script>

<div class="media-uploader">
	<label class="uploader-label">Media (Optional)</label>

	<button
		type="button"
		class="upload-zone"
		class:dragging={isDragging}
		on:click={triggerFileInput}
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:drop={handleDrop}
	>
		<span class="upload-icon">📷</span>
		<span class="upload-text">Click or drag to upload images</span>
		<span class="upload-hint">Photos will be stored on IPFS</span>
	</button>

	<input
		type="file"
		bind:this={fileInput}
		on:change={handleFileSelect}
		accept="image/*"
		multiple
		style="display: none;"
	/>

	{#if uploadedFiles.length > 0}
		<div class="uploaded-files">
			{#each uploadedFiles as file, index}
				<div class="file-item">
					<span class="file-icon">📷</span>
					<span class="file-name">{file}</span>
					<button type="button" class="remove-button" on:click={() => removeFile(index)}>
						✕
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.media-uploader {
		margin-bottom: 1.25rem;
	}

	.uploader-label {
		display: block;
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
	}

	.upload-zone {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		background: rgba(0, 0, 0, 0.3);
		border: 2px dashed theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 2rem 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.upload-zone:hover,
	.upload-zone.dragging {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.upload-icon {
		font-size: 2.5rem;
		line-height: 1;
	}

	.upload-text {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		font-weight: 500;
	}

	.upload-hint {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	.uploaded-files {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.5rem;
		padding: 0.75rem;
	}

	.file-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.file-name {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.8rem;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.remove-button {
		background: none;
		border: none;
		color: theme('colors.sage.DEFAULT');
		cursor: pointer;
		padding: 0;
		font-size: 1.2rem;
		line-height: 1;
		transition: color 0.2s ease;
		flex-shrink: 0;
	}

	.remove-button:hover {
		color: rgba(255, 99, 71, 1);
	}
</style>
