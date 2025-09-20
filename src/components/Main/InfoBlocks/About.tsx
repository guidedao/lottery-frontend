export default function About() {
    return (
        <section id='about' className='container mx-auto px-4 mt-16'>
            <div className='surface-glass rounded-xl p-6'>
                <h2 className='text-2xl lg:text-3xl font-bold text-foreground mb-4'>About</h2>
                <div className='prose prose-invert max-w-none text-foreground/85'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut sem vitae ligula efficitur
                        gravida. Nulla facilisi. In nec felis sed nisl tristique convallis vel eu sapien. Pellentesque
                        habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    </p>
                    <p>
                        Vivamus gravida, massa in vulputate aliquet, tortor nibh porttitor libero, ut suscipit sapien
                        lorem vitae arcu. Cras commodo, mi in volutpat interdum, justo elit rhoncus elit, a viverra nunc
                        enim a nisl. Sed ut sapien at orci bibendum aliquet. Suspendisse potenti.
                    </p>
                    <p>
                        Curabitur bibendum, arcu vel scelerisque sodales, eros ipsum varius lacus, eget fringilla arcu
                        enim nec lorem. Etiam gravida, justo nec luctus gravida, lectus nibh aliquet lorem, vitae
                        pulvinar lectus nibh in lorem.
                    </p>
                </div>
            </div>
        </section>
    );
}
