interface IFilterColumns {
  name: 'gender' | 'size' | 'type'
  title: string
  options: { value: string; text: string}[]
}

export const filterColumns: IFilterColumns[] = [
  {
    name: 'type',
    title: 'Espécie',
    options: [
      {value: '', text: 'Todas'},
      {value: 'cachorro', text: 'Cachorro'},
      {value: 'gato', text: 'Gato'},
    ]
  },
  {
    name: 'size',
    title: 'Porte',
    options: [
      {value: '', text: 'Todos'},
      {value: 'pequeno', text: 'Pequeno'},
      {value: 'medio', text: 'Médio'},
      {value: 'grande', text: 'Grande'},
    ]
  },
  {
    name: 'gender',
    title: 'Sexo',
    options: [
        {value: '', text: 'Todos'},
        {value: 'femea', text: 'Fêmea'},
        {value: 'macho', text: 'Macho'},
    ]
  },
]