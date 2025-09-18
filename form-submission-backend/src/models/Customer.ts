import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

interface CustomerAttributes {
  id: number;
  name?: string | null;
  email: string;
  password: string;
  form_filled: boolean;
  phone_number?: string | null;
  image?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

interface CustomerCreationAttributes
  extends Optional<
    CustomerAttributes,
    "id" | "name" | "phone_number" | "image" | "form_filled"
  > {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string | null;
  public email!: string;
  public password!: string;
  public form_filled!: boolean;
  public phone_number!: string | null;
  public image!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    form_filled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone_number: DataTypes.STRING(50),
    image: DataTypes.STRING(500),
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: false,
    underscored: true,
  }
);

export default Customer;
