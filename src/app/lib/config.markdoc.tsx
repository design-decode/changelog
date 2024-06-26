import { Config } from '@markdoc/markdoc';
import Heading from '../components/content/heading';
// import BlockQuote from './components/blockquote';
import Image from '../components/content/image';
import { Tag } from '@markdoc/markdoc';

const config: Config = {
	nodes: {
		heading: {
			render: 'Heading',
			attributes: {
				level: { type: Number },
				className: { type: String }
			}
		},
		paragraph: {
			render: 'Paragraph'
		},
		strong: {
			render: 'Strong'
		},
		blockquote: {
			render: 'BlockQuote'
		},
		link: {
			render: 'Link',
			attributes: {
				href: {
					type: String
				}
			}
		},
		image: {
			render: 'Image',
			attributes: {
				src: { type: String },
				alt: { type: String }
			}
		},
		list: {
			render: 'List'
		},
		item: {
			render: 'Item'
		},
		table: {
			render: 'Table'
		},
		th: {
			render: 'Th'
		},
		td: {
			render: 'Td'
		},
		fence: {
			render: 'CodeBlock',
			attributes: {
				language: {
					type: String
				},
				file: {
					type: String
				}
			}
		},
		code: {
			render: 'Code',
			attributes: {
				content: {
					type: String
				}
			}
		},
		hr: {
			render: 'Hr'
		}
	},
	tags: {
		tabs: {
			render: 'Tabs',
			attributes: {},
			transform(nodes: any, config: any) {
				const labels = nodes.children.map((item: any) => item.attributes.label);
				return new Tag(this.render, { labels }, nodes.transformChildren(config));
			}
		},

		tab: {
			render: 'Tab',
			attributes: {
				label: {
					type: String
				}
			}
		},
		accordion: {
			render: 'Accordion',
			attributes: {
				title: {
					type: String
				}
			}
		}
	}
};

const components = {
	Heading,
	Paragraph: ({ children }: any) => {
		return <p className="text-2 text-slate-11 font-regular mt-4 mb-6 leading-5">{children}</p>;
	},
	Strong: ({ children }: any) => {
		return <strong className="font-semibold">{children}</strong>;
	},
	List: ({ children }: any) => {
		return <ol className="list-[unset] mb-20px ml-16px">{children}</ol>;
	},
	Item: ({ children }: any) => {
		return <li className="text-12 text-gray-500 mb-8px">{children}</li>;
	},
	Table: ({ children }: any) => {
		return <table className="my-20px">{children}</table>;
	},
	Th: ({ children }: any) => {
		return <th className="pr-20px py-10px border-t border-primary-50 text-12 leading-7 text-gray-500 whitespace-nowrap text-left font-semibold">{children}</th>;
	},
	Td: ({ children }: any) => {
		return <td className="pr-20px py-10px border-t border-primary-50 text-12 leading-7 text-gray-500 text-left font-normal">{children}</td>;
	},
	Link: ({ href, children }: any) => {
		return (
			<a target="_blank" href={href} className="text-14 text-success-400 underline">
				{children}
			</a>
		);
	},
	Image,
	Code: ({ content }: any) => {
		return <code className="text-12 text-gray-800 bg-grey-20 font-menlo rounded-12px py-2px px-8px">{content}</code>;
	},
	Hr: () => {
		return <hr className="border border-slate-3" />;
	}
};

export { config, components };
