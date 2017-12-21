@extends('html')


@section('html')
	<section class="section">
		<img class="img-res" src="/imgs/contactus/1.png" alt="">
		<div class="overlay bg-white70">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="center">
						<h1 class="m0 font3em">联系我们</h1>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">公司简介</h4>
			<div class="row mt3em mb2em">
				<div class="col-sm-8">
					<p class="px1em font16px" style="text-indent: 2em;line-height: 200%;">
						杭州 优果科技是一家专注于为家居建材装修行业服务的营销平台，致力于帮助商家利用实景VR进行
						营销式体验，旗下产品有：VR营销实用，工具装饰公司最实用的3D设计软件（含
						线上线下软件培训体系）+VR体验大屏硬件+多功能推广软件+好会拼团购软件+
						建材场景导购软件+智能家居产品+企业ERP系统+一体化营销课程培训+高性价比主
						材包等行业相关产品，我们是装修行业一站式服务营销平台。
					</p>
				</div>
				<div class="col-sm-4">
					<img class="img-res" src="/imgs/contactus/2.png" alt="">
				</div>
			</div>	
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">联系我们</h4>
			<div class="clearfix center">
				<img class="mt4em mb1em" src="/imgs/contactus/3.png" alt="">
				<h1 class="mc-red">400 - 111 - 8008</h1>
				<p class="mt2em mb8em">如有其他合作（市场推广、供应链合作），请发送邮件</p>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">商务合作</h4>
			
			@php
				$rows=[
					[
						'华东 · 华中地区',
						'赵先生',
						'15314980025',
						'/imgs/contactus/qr1.png',
					],
					[
						'华南地区',
						'方先生',
						'13968051777',
						'/imgs/contactus/qr2.png',
					],
					[
						'华北 · 西北地区',
						'何先生',
						'13758192514',
						'/imgs/contactus/qr3.png',
					],
				];
			@endphp
			
			<div class="clearfix mt2em mb2em">
				@foreach($rows as $row)
					<div class="col-sm-4">
						<div class="clearfix">
							<div class="clearfix p2em bd1px bd-solid bd-gray">
								<div class="clearfix pl3em mb1em">
									<h4 class="mb20px">{{ $row[0] }}</h4>
									<p>
										<img class="dib middle mr1em" height="18" src="/imgs/contactus/i1.png" alt=""> 
										<span class="dib middle">{{ $row[1] }}</span>
									</p>
									<p>
										<img class="dib middle mr1em" height="18" src="/imgs/contactus/i2.png" alt=""> 
										<span class="dib middle">{{ $row[2] }}</span>
									</p>
								</div>
								<div class="center">
									<img height="70" src="{{ $row[3] }}" alt="">
								</div>
							</div>
						</div>
					</div>
				@endforeach
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