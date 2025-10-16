import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Juegos Matemáticos
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Juego 1 - Juego de Colores de Tortuga */}
          <Link
            href="/game1"
            className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <div className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 size-20 border-4 border-black rounded-sm" />
              <h3 className="text-xl font-semibold mb-2">
                Juego de Colores y formas
              </h3>
              <p className="text-blue-100 text-sm">
                Relaciona los colores y formas en la cuadrícula.
              </p>
            </div>
          </Link>

          {/* Juego 2 - Juego de Dados de Tortuga */}
          <Link
            href="/game2"
            className="group bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <Image
                src="/turtle.svg"
                alt="Juego de Dados de Tortuga"
                width={80}
                height={80}
                className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-semibold mb-2">
                Juego de Dados de Tortuga
              </h3>
              <p className="text-green-100 text-sm">
                Lanza los dados y coloca las fichas de colores en el caparazón
                de la tortuga.
              </p>
            </div>
          </Link>

          {/* Juego 3 - Juego de Huevos y Gallina */}
          <Link
            href="/game3"
            className="group bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <Image
                src="/chicken.svg"
                alt="Juego de Huevos y Gallina"
                width={80}
                height={80}
                className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-semibold mb-2">
                Juego de Huevos y Gallina
              </h3>
              <p className="text-yellow-100 text-sm">
                Recolecta la cantidad correcta de huevos para la gallina
                hambrienta.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
