<script lang="ts">
	export let size = 60;
	export let rotationAngle = 0;
	export let style: 'default' | 'filled' = 'default';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 37 36"
	fill="none"
	style="transform: rotate({rotationAngle}deg)"
>
	{#if style == 'filled'}
		<circle cx="18.4199" cy="18" r="18" fill="url(#paint0_linear_12_414)" />
		<path
			d="M18.4199 7.5C16.6077 7.5 15.1387 8.96907 15.1387 10.7812V14.7188H11.2012C9.38899 14.7188 7.91992 16.1878 7.91992 18C7.91992 19.8122 9.38899 21.2812 11.2012 21.2812H15.1387V25.2188C15.1387 27.0309 16.6077 28.5 18.4199 28.5C20.2321 28.5 21.7012 27.0309 21.7012 25.2188V21.2812H25.6387C27.4509 21.2812 28.9199 19.8122 28.9199 18C28.9199 16.1878 27.4509 14.7188 25.6387 14.7188H21.7012V10.7812C21.7012 8.96907 20.2321 7.5 18.4199 7.5Z"
			fill="white"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_12_414"
				x1="18.4199"
				y1="0"
				x2="18.4199"
				y2="36"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#D65FC2" />
				<stop offset="0.317708" stop-color="#E94C9B" />
				<stop offset="0.625" stop-color="#F24671" />
				<stop offset="0.984375" stop-color="#FD576B" />
			</linearGradient>
		</defs>
	{:else}
		<path
			d="M18.4199 0C15.3133 0 12.7949 2.5184 12.7949 5.625V12.375H6.04492C2.93832 12.375 0.419922 14.8934 0.419922 18C0.419922 21.1066 2.93832 23.625 6.04492 23.625H12.7949V30.375C12.7949 33.4816 15.3133 36 18.4199 36C21.5265 36 24.0449 33.4816 24.0449 30.375V23.625H30.7949C33.9015 23.625 36.4199 21.1066 36.4199 18C36.4199 14.8934 33.9015 12.375 30.7949 12.375H24.0449V5.625C24.0449 2.5184 21.5265 0 18.4199 0Z"
			fill="url(#paint0_linear_12_400)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_12_400"
				x1="18.4199"
				y1="0"
				x2="18.4199"
				y2="36"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#D65FC2" />
				<stop offset="0.317708" stop-color="#E94C9B" />
				<stop offset="0.625" stop-color="#F24671" />
				<stop offset="0.984375" stop-color="#FD576B" />
			</linearGradient>
		</defs>
	{/if}
</svg>

<style>
	svg {
		aspect-ratio: 1/1;
	}
</style>
