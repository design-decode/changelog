export type GRID_TYPE = 'link' | 'img' | 'text' | 'title';

export interface GRID_ITEM {
	type?: GRID_TYPE;
	imgSrc?: string;
	title?: string;
	description?: string;
	metaImage?: string;
	domain?: string;
	text?: string;
	link?: string;
	caption?: string;
	linkEnabled?: boolean;
	imgLink?: string;
}
