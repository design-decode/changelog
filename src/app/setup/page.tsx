import Header from '../components/header';
import Template1 from '../../../public/img/template1_dark.png';
import Image from 'next/image';
import Input from '../components/input';

export default function Home() {
	try {
	} catch (error) {}
	return (
		<main className="">
			<Header></Header>

			<section className="mt-space-9 max-w-[600px] mx-auto relative">
				{/* <div className="mb-space-7 text-center">
					<h1 className="text-4 text-slate-12 font-medium">Select a repository</h1>
					<p className="mt-space-2 max-w-[280px] mx-auto text-slate-11 text-1 font-regular">Select the repository you’ll like to keep a log of it’s release change changes.</p>
				</div>

				<ul>
					<li className="flex items-center w-full justify-between border-b border-b-slate-4 pb-space-2 mb-space-5">
						<div className="flex gap-space-2 items-center">
							<div className="text-1 font-regular text-slateA-12">New Repository</div>
							<svg width="12" height="12" viewBox="0 0 12 12" className="fill-slateA-11" xmlns="http://www.w3.org/2000/svg">
								<rect width="12" height="12" fillOpacity="0.01" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3.99998 3.70882C3.99998 3.00826 4.19373 2.48433 4.51456 2.13887C4.83145 1.79765 5.31663 1.58265 6.0011 1.58265C6.68594 1.58265 7.17042 1.79723 7.48656 2.13768C7.80668 2.4824 7.99998 3.00568 7.99998 3.70661V4.8H3.99998V3.70882ZM3.19998 4.8V3.70882C3.19998 2.8652 3.43469 2.12604 3.92837 1.59447C4.42599 1.05864 5.14138 0.782654 6.0011 0.782654C6.86064 0.782654 7.57559 1.05788 8.07278 1.59331C8.56606 2.12447 8.79998 2.86318 8.79998 3.70661V4.8H9.59998C10.0418 4.8 10.4 5.15818 10.4 5.6V10.4C10.4 10.8419 10.0418 11.2 9.59998 11.2H2.39998C1.95815 11.2 1.59998 10.8419 1.59998 10.4V5.6C1.59998 5.15818 1.95815 4.8 2.39998 4.8H3.19998ZM2.39998 5.6H9.59998V10.4H2.39998V5.6Z"
									fillOpacity="0.334"
								/>
							</svg>
						</div>

						<button className="bg-slate-3 text-slate-11 text-1 font-regular flex items-center gap-space-1 h-space-5 px-space-2 rounded-3">
							Connect
							<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_155_1376)">
									<path d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43" className="stroke-slate-6" strokeLinecap="round" strokeLinejoin="round" />
									<path
										d="M18.5703 22H14.0003C11.7103 22 10.5703 20.86 10.5703 18.57V11.43C10.5703 9.14 11.7103 8 14.0003 8H18.5703C20.8603 8 22.0003 9.14 22.0003 11.43V18.57C22.0003 20.86 20.8603 22 18.5703 22Z"
										stroke="#99A2FF"
										strokeLinecap="round"
										className="stroke-slate-11"
										strokeLinejoin="round"
									/>
									<path d="M14.8672 15H18.1272" className="stroke-slate-11" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M16.5 16.63V13.37" className="stroke-slate-11" strokeLinecap="round" strokeLinejoin="round" />
								</g>
								<defs>
									<clipPath id="clip0_155_1376">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</button>
					</li>

					<li className="flex items-center w-full justify-between border-b border-b-slate-4 pb-space-2">
						<div className="flex gap-space-2 items-center">
							<div className="text-1 font-regular text-slateA-12">New Repository</div>
							<svg width="12" height="12" viewBox="0 0 12 12" className="fill-slateA-11" xmlns="http://www.w3.org/2000/svg">
								<rect width="12" height="12" fillOpacity="0.01" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M5.99886 0C5.06054 0 4.28883 0.311544 3.79 0.954888C3.38994 1.47085 3.19998 2.14594 3.19998 2.9066H3.99998C3.99998 2.2745 4.1575 1.7865 4.42222 1.44509C4.7329 1.04442 5.24119 0.8 5.99886 0.8C6.68544 0.8 7.17066 1.01202 7.48674 1.34898C7.80632 1.68969 7.99998 2.20835 7.99998 2.90881V4.8H2.39998C1.95815 4.8 1.59998 5.15818 1.59998 5.6V10.4C1.59998 10.8418 1.95815 11.2 2.39998 11.2H9.59998C10.0418 11.2 10.4 10.8418 10.4 10.4V5.6C10.4 5.15817 10.0418 4.8 9.59998 4.8H8.79998V2.90881C8.79998 2.06508 8.56518 1.32934 8.07022 0.80168C7.57179 0.270297 6.85646 0 5.99886 0ZM2.39998 5.6H9.59998V10.4H2.39998V5.6Z"
									fillOpacity="0.334"
								/>
							</svg>
						</div>

						<button className="bg-slate-3 text-slate-11 text-1 font-regular flex items-center gap-space-1 h-space-5 px-space-2 rounded-3">
							Connect
							<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_155_1376)">
									<path d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43" className="stroke-slate-6" strokeLinecap="round" strokeLinejoin="round" />
									<path
										d="M18.5703 22H14.0003C11.7103 22 10.5703 20.86 10.5703 18.57V11.43C10.5703 9.14 11.7103 8 14.0003 8H18.5703C20.8603 8 22.0003 9.14 22.0003 11.43V18.57C22.0003 20.86 20.8603 22 18.5703 22Z"
										stroke="#99A2FF"
										strokeLinecap="round"
										className="stroke-slate-11"
										strokeLinejoin="round"
									/>
									<path d="M14.8672 15H18.1272" className="stroke-slate-11" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M16.5 16.63V13.37" className="stroke-slate-11" strokeLinecap="round" strokeLinejoin="round" />
								</g>
								<defs>
									<clipPath id="clip0_155_1376">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</button>
					</li>
				</ul> */}

				<button className="text-slate-11 flex gap-space-1 absolute top-0 left-0 items-center font-regular text-1 h-space-5 px-space-2">
					<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-11" xmlns="http://www.w3.org/2000/svg">
						<rect width="16" height="16" fill="white" fillOpacity="0.01" />
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M9.40597 4.4606C9.59343 4.64806 9.59343 4.95197 9.40597 5.13943L6.54538 8.00001L9.40597 10.8606C9.59343 11.048 9.59343 11.3519 9.40597 11.5394C9.21852 11.7269 8.9146 11.7269 8.72715 11.5394L5.52715 8.33943C5.43714 8.2494 5.38657 8.12731 5.38657 8.00001C5.38657 7.87271 5.43714 7.75062 5.52715 7.6606L8.72715 4.4606C8.9146 4.27314 9.21852 4.27314 9.40597 4.4606Z"
							fillOpacity="0.797"
						/>
					</svg>
					back
				</button>

				{/* <div className="mb-space-7 text-center">
					<h1 className="text-4 text-slate-12 font-medium">Select page theme</h1>
					<p className="mt-space-2 max-w-[317px] mx-auto text-slate-11 text-1 font-regular">Select your preferred template from our list of carefully created templates that fits your brand.</p>
				</div>

				<ul className="flex flex-wrap gap-space-5">
					<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
						<Image src={Template1} alt="github picture" priority width={272} height={155} />
						<hr className="border-indigoA-3 my-space-2" />
						<h4 className="font-light text-1 text-slate-11">Template name</h4>
					</li>
					<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
						<Image src={Template1} alt="github picture" priority width={272} height={155} />
						<hr className="border-indigoA-3 my-space-2" />
						<h4 className="font-light text-1 text-slate-11">Template name</h4>
					</li>
					<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
						<Image src={Template1} alt="github picture" priority width={272} height={155} />
						<hr className="border-indigoA-3 my-space-2" />
						<h4 className="font-light text-1 text-slate-11">Template name</h4>
					</li>
					<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
						<Image src={Template1} alt="github picture" priority width={272} height={155} />
						<hr className="border-indigoA-3 my-space-2" />
						<h4 className="font-light text-1 text-slate-11">Template name</h4>
					</li>
				</ul> */}

				<div className="mb-space-7 text-center">
					<h1 className="text-4 text-slate-12 font-medium">Just a couple of details...</h1>
					<p className="mt-space-2 max-w-[317px] mx-auto text-slate-11 text-1 font-regular">Lastly, please confirm the details below and your change-log page will be good to go.</p>
				</div>

				<form className="max-w-[360px] mx-auto">
					<Input id="website-name" className="mb-space-5" placeholder="Project name" />
					<Input id="website-url" className="mb-space-5" placeholder="Project URL" />
					<Input id="primary-color" className="mb-space-5" placeholder="Primary color" />

					<div className="mb-space-5">
						<label htmlFor="logo" className="w-full text-slateA-6 text-1 font-light block">
							<div className="mb-space-2 text-slate-10">Website Logo</div>
							<div className="border-dotted bg-slateA-2 rounded-3 border border-slate-4 max-w-[360px] min-h-[103px] flex items-center justify-center text-center flex-col gap-space-3">
								<svg width="16" height="17" viewBox="0 0 16 17" className="fill-slate-8" xmlns="http://www.w3.org/2000/svg">
									<rect width="16" height="16" transform="translate(0 0.5)" fill="white" fillOpacity="0.01" />
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M8.33943 1.7607C8.15198 1.57326 7.84806 1.57326 7.66061 1.7607L4.46061 4.9607C4.27315 5.14816 4.27315 5.45207 4.46061 5.63953C4.64806 5.82697 4.95198 5.82697 5.13943 5.63953L7.52002 3.25894V10.6333C7.52002 10.8984 7.73492 11.1133 8.00002 11.1133C8.26512 11.1133 8.48002 10.8984 8.48002 10.6333V3.25894L10.8607 5.63953C11.0481 5.82697 11.352 5.82697 11.5394 5.63953C11.7269 5.45207 11.7269 5.14816 11.5394 4.9607L8.33943 1.7607ZM2.66663 11.1667C2.96118 11.1667 3.19997 11.4054 3.19997 11.7V13.3C3.19997 13.8907 3.67533 14.3667 4.26274 14.3667H11.7346C12.3231 14.3667 12.8 13.8897 12.8 13.3V11.7C12.8 11.4054 13.0388 11.1667 13.3333 11.1667C13.6278 11.1667 13.8666 11.4054 13.8666 11.7V13.3C13.8666 14.4776 12.9132 15.4334 11.7346 15.4334H4.26274C3.08284 15.4334 2.1333 14.4766 2.1333 13.3V11.7C2.1333 11.4054 2.37208 11.1667 2.66663 11.1667Z"
										fillOpacity="0.788"
									/>
								</svg>

								<p className="text-slate-8 max-w-[240px] mx-auto">Drop logo here or click here to select from file picker</p>
							</div>
						</label>
						<input type="file" id="logo" className="hidden invisible" />
					</div>

					<div className="flex justify-end">
						<button className="text-slate-2 flex gap-space-1 items-center font-regular text-1 h-space-6 px-space-3 rounded-2 bg-slate-12">
							Complete Setup
							<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-8" xmlns="http://www.w3.org/2000/svg">
								<rect width="16" height="16" fill="white" fillOpacity="0.01" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6.59408 4.46063C6.78153 4.27317 7.08545 4.27317 7.2729 4.46063L10.4729 7.66063C10.5629 7.75065 10.6135 7.87274 10.6135 8.00004C10.6135 8.12735 10.5629 8.24944 10.4729 8.33946L7.2729 11.5394C7.08545 11.7269 6.78153 11.7269 6.59408 11.5394C6.40663 11.352 6.40663 11.0481 6.59408 10.8607L9.45467 8.00004L6.59408 5.13946C6.40663 4.952 6.40663 4.64809 6.59408 4.46063Z"
								/>
							</svg>
						</button>
					</div>
				</form>
			</section>
		</main>
	);
}
