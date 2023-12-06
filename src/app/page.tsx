import Header from './components/header';
import DefaultTemplate from './components/templates/default';
import GitTemplate from './components/templates/git';
import DateTemplate from './components/templates/date';

export default function Home() {
	return (
		<main className="">
			<Header></Header>

			<section className="mt-space-9 max-w-[727px] mx-auto">
				<article className="mt-space-7 flex flex-col gap-space-9">
					<DateTemplate />
					<GitTemplate />
					<DefaultTemplate />
					<DefaultTemplate />
					<DefaultTemplate />
				</article>
			</section>
		</main>
	);
}
