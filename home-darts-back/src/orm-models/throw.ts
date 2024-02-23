import { DataTypes } from 'sequelize';
import { sequelize } from '../config/pg-connect.js';

export const ThrowOrm = sequelize.define('Throw', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'creation_date',
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'game_id',
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'player_id',
  },
  hit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nominal: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  multiplier: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  }
}, {
  timestamps: false,
  schema: 'public',
  tableName: 'throw'
});
