// ============================================================
// YOUR CHALLENGE: Build a Generic Data Pipeline
// Time: ~35 minutes
// ============================================================

// You're building a data processing pipeline where:
//
// 1. Data comes in as one type
// 2. Gets transformed through multiple steps
// 3. Comes out as another type
//
// Each step is a generic transformation.

// ============================================================
// PART A: Build Generic Interfaces & Classes
// ============================================================

/*
1. Create a generic Validator<T> interface

Requirements:
- Should work with ANY type
- Returns validation result with:
  - valid: boolean
  - errors: string[]
*/

interface ValidatorOutput {
  valid: boolean;
  errors: string[]
}

interface Validator<T> {
  validate(item: T):ValidatorOutput
}


class RawProductValidator implements Validator<Product> {
  validate(item: Product): ValidatorOutput{
      let err: string[] = [];

      if (!item.sku) {
        err.push("Sku is Empty")
        return {
          valid: false,
          errors: err
        }
      }

      if ( typeof(item.price) != 'number' || item.price < 0 ) {
        err.push("Item price is not valid")
        return {
          valid: false,
          errors: err
        }
      }

      return {
        valid: true,
        errors: err
      }
   } 
}
/*
2. Create a generic Mapper<TIn, TOut> interface

Requirements:
- Transforms one type to another
*/

interface Mapper<TIn, TOut> {
  map(input: TIn): TOut;
}

class RawToProductMapper implements Mapper<RawProduct, Product> {
  map(input: RawProduct): Product {
    let product: Product = {
      ...input,
      price: parseFloat(input.price),
      stock: parseFloat(input.stock),
      inStock: false
    }

    // Seprate db call we can create a StockREpositoryfor this for better implemenation
    if (checkInStock(input)) {
      product.inStock = true;
    }

    return product;
  }
}


/*
3. Create a generic Filter<T> interface

Requirements:
- Filters a collection based on criteria
*/

interface Filter<T> {
  apply(items: T[]): T[];
}


class InStockFilter implements Filter<Product> {
  private map: Map<string, Product>;
  constructor() {
    this.map = new Map<string, Product>();
  }

  apply(items: Product[]): Product[] {
    items.map(item => {
      if (item.inStock) {
        this.map.set(item.sku, item)
      }
    })
  }
}
/*
4. Create a generic Pipeline<TIn, TOut> class

Requirements:
- Takes input of type TIn
- Applies validators, mappers, and filters in sequence
- Produces output of type TOut
*/

// class Pipeline<TIn, TOut> {
//   ...
// }

class Pipeline<TIn, TOut> {
  constructor(
    private validator: Validator<TIn>,
    private mapper: Mapper<TIn, TOut>,
    private filters: Filter<TOut>[]   // array — compose any number of filters
  ) {}

  process(rawItems: TIn[]): TOut[] {
    // Step 1: Validate — drop invalid rows
    const validItems = rawItems.filter((item) => {
      const result = this.validator.validate(item);
      if (!result.valid) {
        console.warn(`Skipping item due to errors: ${result.errors.join(", ")}`);
      }
      return result.valid;
    });

    // Step 2: Map — transform each item
    const mappedItems = validItems.map((item) => this.mapper.map(item));

    // Step 3: Filter — chain all filters in sequence
    return this.filters.reduce((items, filter) => filter.apply(items), mappedItems);
  }
}

// ============================================================
// PART B: Build a Concrete Product Pipeline
// ============================================================

/*
Raw CSV row (input data)
*/

interface RawProduct {
  sku: string;
  name: string;
  price: string;   // Comes as string from CSV
  stock: string;   // Comes as string from CSV
  category: string;
}

/*
Clean product (output data)
*/

interface Product {
  sku: string;
  name: string;
  price: number;   // Parsed to number
  stock: number;   // Parsed to number
  category: string;
  inStock: boolean; // Derived field
}

/*
1. Build RawProductValidator

Implements:
- Validator<RawProduct>

Validation Rules:
- sku should not be empty
- price should be a valid number
- stock should be a valid number
*/

// class RawProductValidator implements Validator<RawProduct> {
//   ...
// }

/*
2. Build RawToProductMapper

Implements:
- Mapper<RawProduct, Product>

Responsibilities:
- Parse strings to numbers
- Derive inStock field
*/

// class RawToProductMapper
//   implements Mapper<RawProduct, Product> {
//   ...
// }

/*
3. Build InStockFilter

Implements:
- Filter<Product>

Requirements:
- Keep only products where inStock === true
*/

// class InStockFilter implements Filter<Product> {
//   ...
// }

/*
4. Wire everything into:

Pipeline<RawProduct, Product>
*/

// ============================================================
// PART C: Make the Pipeline Extensible
// ============================================================

/*
Add a PriceRangeFilter<Product>

Requirements:
- Keeps products within a min/max price range
- Should compose with InStockFilter
- MUST work without modifying existing code
*/

// class PriceRangeFilter implements Filter<Product> {
//   ...
// }

// ============================================================
// Goal
// ============================================================

/*
Demonstrate:

- Generics
- Composition
- Extensibility
- Interface-driven design
- Open/Closed Principle
- Reusable pipeline architecture
*/