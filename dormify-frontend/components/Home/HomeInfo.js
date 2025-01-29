import Image from 'next/image';
import React from 'react';

export default function HomeInfo() {
  return (
    <div className="bg-gray-300 w-full flex flex-col h-screen ">
      <section id="about">
        <h1 className="text-center mt-24 text-6xl">O nas</h1>
        <div className="flex flex-col items-center justify-center justify-items-center w-full h-fit">
          <div className="mt-24 flex flex-row gap-16 items-center text-justify w-[50%]">
            <div>
              <p>
                Doomify to nowoczesne narzędzie do zarządzania administracją i
                mieszkańcami akademika. Ułatwia zarządzanie danymi, zgłoszeniami
                technicznymi oraz komunikację z mieszkańcami. Przejrzystość i
                wygoda w jednym miejscu! Nasz system jest zaprojektowany z myślą
                o prostocie i efektywności – wystarczy kilka kliknięć, aby
                zarezerwować swoje miejsce. W pełni integrujemy się z systemami
                akademickimi, co pozwala każdemu mieszkańcowi na bezproblemowe
                korzystanie z usługi. Jeśli cenisz sobie porządek i wygodę,
                nasza aplikacja jest dla Ciebie! Dołącz do społeczności, która
                korzysta z nowoczesnych rozwiązań, i zarezerwuj swój termin już
                dziś. Tworzymy zespół pasjonatów technologii, którzy stawiają na
                praktyczne rozwiązania dla studentów. Naszą misją jest
                upraszczanie codziennych wyzwań – jeden projekt na raz. Razem
                sprawiamy, że zarządzanie pralnią staje się prostsze!
              </p>
            </div>
            <Image
              src={'/images/preview.webp'}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/*            Doomify to nowoczesne narzędzie do zarządzania administracją i
              mieszkańcami akademika. Ułatwia zarządzanie danymi, zgłoszeniami
              technicznymi oraz komunikację z mieszkańcami. Przejrzystość i
              wygoda w jednym miejscu! */
