export default function FAQ() {
    return (
        <section id='faq' className='container mx-auto px-4 mt-16'>
            <div className='surface-glass rounded-xl p-6'>
                <h2 className='text-2xl lg:text-3xl font-bold text-foreground mb-4'>FAQ</h2>
                <div className='space-y-6 text-foreground/85'>
                    <div>
                        <h3 className='text-lg font-semibold text-foreground'>What is this project about?</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ipsum
                            vitae neque aliquet interdum. Integer convallis, dui at accumsan faucibus,
                            velit magna facilisis nisl, sit amet tempor arcu lorem ut mi.
                        </p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-foreground'>How do I participate?</h3>
                        <p>
                            Quisque suscipit, risus eu sollicitudin feugiat, tellus arcu pretium massa,
                            sit amet feugiat magna massa nec magna. Sed cursus, nibh sed consectetur
                            bibendum, turpis magna finibus ex, sit amet faucibus neque arcu in ligula.
                        </p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-foreground'>When are winners announced?</h3>
                        <p>
                            Suspendisse potenti. Morbi sagittis nulla non nunc mattis, eget gravida
                            augue fermentum. Curabitur ullamcorper, sem at porta volutpat, turpis nisi
                            rhoncus lorem, a gravida massa dolor non nibh.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
