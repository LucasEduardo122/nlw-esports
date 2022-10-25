import './styles/main.css'
import logo from './assets/logo.png'
import { CaretDown, Check, GameController, MagnifyingGlass } from 'phosphor-react'
import Card from './components/card'
import { useEffect, useState } from 'react'
import api from './service/api';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export default function App() {
  const [dataApi, setDataApi] = useState([]);
  const [weekDays, setWeekDays] = useState([])
  const [useChannel, setVoiceUseChannel] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    const data = Object.fromEntries(formData)

    console.log(weekDays)

    if(!data.game || !data.name || !data.yearsPlaying || !data.discord || !data.hourStart || !data.hourEnd) {
      alert('Informe todos os campos')
      return
    }

    try {
      await api.post(`http://localhost:3000/ads/insert`, {
      gameId: data.game,
      name: data.name,
      yearsPlaying: data.yearsPlaying,
      discord: data.discord,
      weekDays: weekDays,
      hoursStart: data.hourStart,
      hoursEnd: data.hourEnd,
      useVoiceChannel: useChannel == true ? "Sim" : "Não"
    })
    alert('Anúncio criado com sucesso')
    } catch (error) {
      alert('Falha ao criar anúncio')
      console.log(error)
    }
  }

  useEffect(() => {
    async function getGames() {
      const dados = await api.get('/games')

      dados.status == 200 ? setDataApi(dados.data) : dataApi;
    }

    getGames();

  }, [])
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui</h1>

      {dataApi != [] ? <Card data={dataApi} /> : <span className='text-white'>Nenhum dado encontrado</span>}

      <Dialog.Root>
        <div className='pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg'>
          <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
            <div>
              <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
              <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
            </div>

            <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3'>
              <MagnifyingGlass size={24} />
              Publicar anúncio
            </Dialog.Trigger>
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>

            <form action="" onSubmit={handleSubmit} method="post" className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <select name="game" className='rounded gap-1 bg-zinc-900 py-3 px-4 text-sm placeholder:zinc-500 appearance-none' id='game' defaultValue="">

                  <option disabled value="">Selecione o game que deseja jogar</option>
                  {dataApi.map(game => (
                    <option key={game.title} value={game.id}>{game.title}</option>
                  ))}

                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
                <input id='name' name="name" className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500' placeholder='Como te chamam dentro do game?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying" className='font-semibold'>Joga há quantos anos?</label>
                  <input name="yearsPlaying" id='yearsPlaying' className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500' type="number" placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord" className='font-semibold'>Qual o seu discord?</label>
                  <input name="discord" id='discord' className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500' placeholder='Usuário#0000' />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar?</label>
                  <ToggleGroup.Root name="weekDays" id='weekDays' type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} >
                    <ToggleGroup.Item value='0' title='Domingo' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                    <ToggleGroup.Item value='1' title='Segunda' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                    <ToggleGroup.Item value='2' title='Terça' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                    <ToggleGroup.Item value='3' title='Quarta' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value='4' title='Quinta' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value='5' title='Sexta' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                    <ToggleGroup.Item value='6' title='Sábado' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart" className='font-semibold'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <input name="hourStart" className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500' type="time" id="hourStart" placeholder='De' />
                    <input name="hourEnd" className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500' type="time" id="hourEnd" placeholder='Até' />
                  </div>
                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm items-center'>
                <Checkbox.Root checked={useChannel} onCheckedChange={(checked) => {
                  if (checked == true) {
                    setVoiceUseChannel(true)
                  } else {
                    setVoiceUseChannel(false)
                  }
                }} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                  <Checkbox.Indicator>
                    <Check className='w-4 h-4 text-emerald-400' />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600' type='button'>Cancelar</Dialog.Close>
                <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                  <GameController className='w-6 h-6' /> Publicar</button>
              </footer>
            </form>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}