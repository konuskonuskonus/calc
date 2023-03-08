export type DropdownContainerType = 'constructor' | 'main'

export type CalculatorPieceType = 'display' | 'actions' | 'numbers' | 'equal'

export interface ICalculatorPiece {
    id: string,
    title: CalculatorPieceType,
    placed: DropdownContainerType,
}

export type Switch = 'runtime' | 'constructor'