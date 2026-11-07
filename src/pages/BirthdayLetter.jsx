import usePageTitle from "../hooks/usePageTitle.js";
import { person } from "../data/birthday.js";
import { letter, letterPage } from "../data/letter.js";

export default function BirthdayLetter() {
  usePageTitle("Birthday Letter");

  return (
    <div className="wrap letter-page">
      <aside className="letter-aside">
        <div className="envelope" aria-hidden="true">
          <div className="envelope__back" />
          <div className="envelope__paper" />
          <div className="envelope__front" />
          <div className="envelope__flap" />
          <span className="envelope__seal" />
        </div>
        <h1 className="page-title page-title--small">{letterPage.title}</h1>
        <p className="hand-note">{letterPage.envelopeNote}</p>
      </aside>

      <article className="letter" aria-label={`${letterPage.title} untuk ${person.name}`}>
        <header className="letter__head">
          <p className="letter__date">{letter.dateLabel}</p>
          <p className="letter__greeting">{letter.greeting}</p>
        </header>

        {letter.sections.map((section) => (
          <section className="letter__section" key={section.id}>
            {letterPage.showSectionLabels && <h2 className="letter__label">{section.label}</h2>}
            {section.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </section>
        ))}

        <footer className="letter__foot">
          <p>{letter.closing}</p>
          {letter.signature && (
            <>
              <p className="letter__signoff">{letter.signoff}</p>
              <p className="letter__signature">{letter.signature}</p>
            </>
          )}
        </footer>
      </article>
    </div>
  );
}
