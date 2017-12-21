@extends('html')


@section('html')
	@include($nav)

	<section class="section">
		<img class="img-res" src="/imgs/supply/1.png" alt="">
		<div class="overlay bg-white70">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="center" style="margin-top: -4em;">
						<h1 class="mb1em"><span class="dib py10px px1em c-white" style="background-color: #000;">{{ $TITLE }}</span></h1>
						<h2 class="mb1em" style="color: #2D2A2A;">精选多款套餐，让装企轻松赚钱</h2>
						<h5>拥有多年经验的供应链团队考察全国家具品牌厂商</h5>
						<h5>精心研发出风格多样，性价比超高的套餐产品</h5>
						<h5>让装企业务范围从硬装轻松拓展到主材销售和家具销售</h5>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section mbg-gray py2em">
		<div class="container">
			<h4 class="title">套餐品牌</h4>
			
			@php
				$rows=[
					[
						'瓷砖',
						[],
					],
					[
						'烟机灶具',
						[],
					],
					[
						'地板',
						[],
					],
					[
						'集成吊顶',
						[],
					],
					[
						'卫浴',
						[],
					],
					[
						'水槽龙头',
						[],
					],
					[
						'室内门',
						[],
					],
					[
						'五金配件',
						[],
					],
					[
						'橱柜',
						[],
					],
					[
						'开关面板',
						[],
					],
				];	
			@endphp

			<div class="clearfix mt2em mb2em">
				<ul class="float-ul float-ul-2">
					@foreach($rows as $row)
						<li class="bg-white" style="border: 0.5px solid #eee;">
							<span class="dib center py2em" style="width:90px;">{{ $row[0] }}</span>
						</li>
					@endforeach
				</ul>
			</div>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
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