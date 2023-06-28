import { model, Schema, Model, Document, Types } from 'mongoose';

interface Categories {
  correct: number;
  total: number;
}

interface ICategory extends Document {
  film_and_tv: Categories;
  history: Categories;
  music: Categories;
  general_knowledge: Categories;
  sport_and_leisure: Categories;
  food_and_drink: Categories;
  arts_and_literature: Categories;
  science: Categories;
  geography: Categories;
  society_and_culture: Categories;
}

const CategorySchema: Schema = new Schema({ 
  film_and_tv: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  history: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  music: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  general_knowledge: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  sport_and_leisure: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  food_and_drink: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  arts_and_literature: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  science: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  geography: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
  society_and_culture: { 
	  correct: { type: Number }, 
	  total: { type: Number} 
	},
})

const CategoryModel: Model<ICategory> = model<ICategory>("Category", CategorySchema)
export const Category = CategoryModel