'use client';

import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

export function FranckShowcase() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-purple-900/60 bg-[#130825] px-8 py-12 text-[#f6eaff] shadow-[0_40px_80px_-40px_rgba(168,85,247,0.55)] md:px-14">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.22),_transparent_60%)]"
      />

      <div className="relative flex flex-col gap-6">
        <span className="w-fit rounded-full border border-fuchsia-400/50 bg-fuchsia-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-200">
          Pentester & Student
        </span>

        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Bonjour à tous ! Je suis Franck Chevalier (Wayko), passionné de cybersécurité,
          originaire de La Réunion 🇷🇪.
        </h1>

        <p className="max-w-2xl text-pretty text-[#f2d8ffcc]">
          Étudiant à École 2600 et alternant pentester chez Lexfo, je partage ici mes terrains
          de jeu favoris&nbsp;: le Web, Active Directory, les CTFs et les ProLabs Hack The Box.
        </p>

        <Callout
          title="Restons en contact"
          type="info"
          className="border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-100"
        >
          Disponible pour échanger autour de mes articles, retours d’expérience pentest ou
          simplement parler cybersécurité.
        </Callout>
      </div>

      <div className="relative mt-10 grid gap-10 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-8">
          <Tabs
            items={['Français', 'English']}
            defaultIndex={0}
            className="overflow-hidden rounded-2xl border border-purple-900/60 bg-[#201036]/70 backdrop-blur"
          >
            <Tab value="Français" className="prose prose-invert max-w-none px-6 py-6">
              <p>
                Bonjour à tous ! Je m&apos;appelle Franck Chevalier, a.k.a Wayko, et je suis
                originaire de l&apos;île de la Réunion.
              </p>
              <p>
                Je suis actuellement étudiant à École 2600, une école de cybersécurité en France.
                En parallèle, je suis alternant chez Lexfo, où je fais du pentest.
              </p>
              <p>
                Je suis passionné par le Web, Misc et Active Directory. J&apos;adore apprendre de
                nouvelles choses en découvrant de nouvelles technologies et en participant à des
                CTFs avec Phreaks 2600 ou mon entreprise.
              </p>
              <p>
                Je passe du temps sur Hack The Box, PortSwigger, YesWeHack - Dojo… Je suis
                certifié OSCP, OSWA, KLCP et CBBH, et j&apos;ai complété les ProLabs Zephyr, Dante
                et Genesis.
              </p>
            </Tab>

            <Tab value="English" className="prose prose-invert max-w-none px-6 py-6">
              <p>
                Hello everyone! My name is Franck Chevalier (Wayko) and I come from Réunion Island.
              </p>
              <p>
                I&apos;m studying at École 2600, a cybersecurity school in France, while working as
                a pentesting apprentice at Lexfo.
              </p>
              <p>
                I love the web, misc challenges, and Active Directory. Learning new technologies —
                especially through CTFs with Phreaks 2600 and my company — keeps me motivated.
              </p>
              <p>
                You&apos;ll often find me on Hack The Box, PortSwigger, and YesWeHack Dojo. I hold
                OSCP, OSWA, KLCP, and CBBH certifications, and I&apos;ve cleared the Zephyr, Dante,
                and Genesis ProLabs.
              </p>
            </Tab>
          </Tabs>

          <Steps>
            <Step>
              <h3 className="text-lg font-semibold text-[#f6eaff]">Formation & alternance</h3>
              <p className="text-sm text-[#f2d8ffcc]">
                École 2600 (Cybersécurité) · Alternant pentester chez Lexfo avec une exposition
                directe aux missions Red Team.
              </p>
            </Step>
            <Step>
              <h3 className="text-lg font-semibold text-[#f6eaff]">CTFs & communautés</h3>
              <p className="text-sm text-[#f2d8ffcc]">
                Phreaks 2600, Lexfo, Hack The Box, PortSwigger, YesWeHack - Dojo&nbsp;: pratique
                régulière, partage de write-ups et mentoring.
              </p>
            </Step>
            <Step>
              <h3 className="text-lg font-semibold text-[#f6eaff]">Certifications & labs</h3>
              <p className="text-sm text-[#f2d8ffcc]">
                OSCP · OSWA · KLCP · CBBH · HTB ProLabs: Zephyr, Dante, Genesis — preuves concrètes
                d’expertise offensive.
              </p>
            </Step>
          </Steps>
        </div>

        <aside className="space-y-6">
          <Cards className="grid-cols-1 gap-4 sm:grid-cols-2">
            <Card
              title="Origines"
              description="Île de la Réunion 🇷🇪 d'où je puise ma curiosité et ma résilience."
            />
            <Card
              title="Tech radar"
              description="Web offensive, Active Directory, automations, nouvelles stacks défensives."
            />
            <Card
              title="Escouades CTF"
              description="Phreaks 2600 • Lexfo — partage constant de techniques et retours d'expérience."
            />
            <Card
              title="Plateformes favorites"
              description="Hack The Box, PortSwigger Academy, YesWeHack Dojo pour rester affûté."
            />
          </Cards>

          <Callout
            type="info"
            title="Envie de collaborer ?"
            className="border border-purple-800/60 bg-[#241037] text-fuchsia-100"
          >
            Proposez un talk, un atelier CTF ou un audit : je réponds avec plaisir.
          </Callout>
        </aside>
      </div>
    </section>
  );
}
