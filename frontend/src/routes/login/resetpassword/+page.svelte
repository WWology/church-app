<script>
	import OTPForm from "$lib/components/otp-form.svelte";
	import PasswordresetForm from "$lib/components/passwordreset-form.svelte";

	let codeSent = $state(false);
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm md:max-w-3xl">
		{#if codeSent}
			<OTPForm />
		{:else}
			<PasswordresetForm />
		{/if}
	</div>
</div>
