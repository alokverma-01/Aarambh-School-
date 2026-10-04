import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { useTitle } from '../lib/hooks';
import { disclosure } from '../data/content';

// CBSE requires affiliated schools to publish these details on their website.
export default function Disclosure() {
  useTitle('Mandatory public disclosure');
  return (
    <>
      <PageHero title="Mandatory public disclosure" intro="Details and documents published as required by CBSE for affiliated schools." bg="var(--mist)" fg="var(--ink)" doodles={['book', 'pencil']} />
      <section className="section">
        <div className="container disclosure">
          <Reveal className="table-card">
            <h2>General information</h2>
            <table>
              <tbody>
                {disclosure.general.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="table-card" delay={0.1}>
            <h2>Documents and information</h2>
            <table>
              <tbody>
                {disclosure.documents.map((d) => (
                  <tr key={d}>
                    <th scope="row">{d}</th>
                    <td>
                      <a className="text-link" href="#">
                        View document
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </>
  );
}
