<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

$query = new WP_Query(
	[
		'post_type' => 'team_member',
		'orderby'   => 'menu_order',
	]
);
?>

<?php if ( $query->have_posts() ) : ?>
	<section
		data-splide="<?php echo esc_html( wp_json_encode( $attributes['splide'], JSON_PRETTY_PRINT ) ); ?>"
		<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'splide alignfull' ] ) ); ?>
	>
		<div class="splide__track">
			<div class="splide__list">
				<?php while ( $query->have_posts() ) : $query->the_post(); ?>
					<div class="splide__slide">
						<div class="team-member" style="--team-member-color: var(--wp--custom--color--<?php echo esc_attr( get_post_meta( get_the_ID(), 'color', true ) ); ?>);">
							<figure class="team-member__figure">
								<?php the_post_thumbnail( 'tall', [ 'class' => 'team-member__image' ] ); ?>
							</figure>

							<h3 class="team-member__title">
								<?php the_title(); ?>
							</h3>

							<?php if ( $job_title = get_post_meta( get_the_ID(), 'job_title', true ) ) : ?>
								<p class="team-member__subtitle"><?php echo esc_html( $job_title ); ?></p>
							<?php endif; ?>
						</div>
					</div>
				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
			</div>
		</div>

		<div class="splide__arrows">
			<button class="splide__arrow splide__arrow--prev">
				<?php Pulsar\display_svg( 'arrow-left' ); ?>
			</button>
			<button class="splide__arrow splide__arrow--next">
				<?php Pulsar\display_svg( 'arrow-right' ); ?>
			</button>
		</div>
	</section>
<?php endif; ?>
