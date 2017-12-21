@extends('html')


@section('html')
	<section class="section">
		<img class="img-res" src="/imgs/partner/1.png" alt="">
		<div class="overlay">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="clearfix">
						<div class="col-sm-offset-7 col-sm-3 center mt13em px0">
							<a class="btn btn-apply" href="">申请合作</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">改变传统家具家装零售模式</h4>
			<p class="subtitle">通过AR/VR技术，赋能家具装修行业</p>
			<div class="row mb1em">
				@php
					$rows=[
						[
							'/imgs/partner/2.png',
							'高盛预测2025年AR/VR市场规模将达1820亿美元',
						],
						[
							'/imgs/partner/3.png',
							'高盛预测AR/VR在房地产相关领域大有作为',
						],
						[
							'/imgs/partner/4.png',
							'艾瑞预测2025年VR用户规模突破2500万',
						],
					];	
				@endphp

				@foreach($rows as $row)
					<div class="col-sm-4">
						<div class="clearfix p2em">
							<img class="img-res" src="{{ $row[0] }}" alt="">
							<p class="center">{{ $row[1] }}</p>
						</div>
					</div>
				@endforeach
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">速览家城市合伙人</h4>
			<p class="subtitle">在合作区域内推广打扮家产品和服务</p>
			@php
				$rows=[
					[
						'/imgs/partner/i1.png',
					],
					[
						'/imgs/partner/i2.png',
					],
					[
						'/imgs/partner/i3.png',
					],
					[
						'/imgs/partner/i4.png',
					],
					[
						'/imgs/partner/i5.png',
					],
					[
						'/imgs/partner/i6.png',
					],
				];	
			@endphp
			
			<div class="row mt2em">
				<div class="col-sm-offset-1 col-sm-10">
					<div class="row">
						@foreach($rows as $key => $row)
							<div class="col-sm-4">
								<div class="p1em">
									<img class="img-res" src="{{ $row[0] }}" alt="">
								</div>
							</div>

							@if( ($key+1)%3==0 )
								</div><div class="row">
							@endif
						@endforeach
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section pt2em">
		<div class="container">
			<h4 class="title">代理条件</h4>
			<div class="row mt4em">
				<div class="col-sm-offset-1 col-sm-10">
					<img class="img-res" src="/imgs/partner/5.png" alt="">
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">成为速览家城市合伙人</h4>
			@php
				$rows=[
					[
						'/imgs/partner/t1.png',
						'线上申请',
					],
					[
						'/imgs/partner/t2.png',
						'考察评估',
					],
					[
						'/imgs/partner/t3.png',
						'确认合作',
					],
					[
						'/imgs/partner/t4.png',
						'签订合同',
					],
				];	
			@endphp

			<div class="row mt2em">
				<div class="col-sm-offset-1 col-sm-10">
					<div class="row">
						@foreach($rows as $key => $row)
							<div class="col-sm-3">
								<div class="p3em">
									<img class="img-res" src="{{ $row[0] }}" alt="">
									<p class="center mt1em">{{ $row[1] }}</p>
								</div>
							</div>
						@endforeach
					</div>
				</div>
			</div>

			<div class="clearfix center mb4em">
				<a class="btn btn-apply" href="">申请合作</a>
			</div>
		</div>
	</section>

@endsection



@push('css2')
	<style type="text/css" media="screen">
		
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$(function(){
		
	});
	</script>
@endpush